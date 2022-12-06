// src/ts.ts
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { babelParse, getLang, resolveObjectKey } from "@vue-macros/common";
import { isDeclaration } from "@babel/types";
var tsFileCache = {};
async function getTSFile(filePath) {
  if (tsFileCache[filePath])
    return tsFileCache[filePath];
  const content = await readFile(filePath, "utf-8");
  const program = babelParse(
    await readFile(filePath, "utf-8"),
    getLang(filePath)
  );
  return tsFileCache[filePath] = {
    filePath,
    content,
    ast: program.body
  };
}
var isTSDeclaration = (node) => isDeclaration(node) && node.type.startsWith("TS");
function mergeTSProperties(a, b) {
  return {
    callSignatures: [...a.callSignatures, ...b.callSignatures],
    constructSignatures: [...a.constructSignatures, ...b.constructSignatures],
    methods: { ...a.methods, ...b.methods },
    properties: { ...a.properties, ...b.properties }
  };
}
async function resolveTSProperties({
  type,
  scope
}) {
  if (type.type === "TSInterfaceBody") {
    return resolveTypeElements(scope, type.body);
  } else if (type.type === "TSTypeLiteral") {
    return resolveTypeElements(scope, type.members);
  } else if (type.type === "TSInterfaceDeclaration") {
    let properties = resolveTypeElements(scope, type.body.body);
    if (type.extends) {
      const resolvedExtends = (await Promise.all(
        type.extends.map(
          (node) => node.expression.type === "Identifier" ? resolveTSReferencedType({
            scope,
            type: node.expression
          }) : void 0
        )
      )).filter(filterValidExtends);
      if (resolvedExtends.length > 0) {
        const ext = (await Promise.all(
          resolvedExtends.map((resolved) => resolveTSProperties(resolved))
        )).reduceRight((acc, curr) => mergeTSProperties(acc, curr));
        properties = mergeTSProperties(ext, properties);
      }
    }
    return properties;
  } else if (type.type === "TSIntersectionType") {
    let properties = {
      callSignatures: [],
      constructSignatures: [],
      methods: {},
      properties: {}
    };
    for (const subType of type.types) {
      const resolved = await resolveTSReferencedType({
        scope,
        type: subType
      });
      if (!filterValidExtends(resolved))
        continue;
      properties = mergeTSProperties(
        properties,
        await resolveTSProperties(resolved)
      );
    }
    return properties;
  } else {
    throw new Error(`unknown node: ${type == null ? void 0 : type.type}`);
  }
  function filterValidExtends(node) {
    return !isTSExports(node) && [
      "TSInterfaceDeclaration",
      "TSTypeLiteral",
      "TSIntersectionType"
    ].includes(node == null ? void 0 : node.type.type);
  }
}
function resolveTypeElements(scope, elements) {
  var _a;
  const properties = {
    callSignatures: [],
    constructSignatures: [],
    methods: {},
    properties: {}
  };
  const tryGetKey = (element) => {
    try {
      return resolveObjectKey(element.key, element.computed, false);
    } catch {
    }
  };
  for (const element of elements) {
    switch (element.type) {
      case "TSCallSignatureDeclaration":
        properties.callSignatures.push({ scope, type: element });
        break;
      case "TSConstructSignatureDeclaration":
        properties.constructSignatures.push({ scope, type: element });
        break;
      case "TSMethodSignature": {
        const key = tryGetKey(element);
        if (!key)
          continue;
        if (properties.properties[key])
          continue;
        if (!properties.methods[key])
          properties.methods[key] = [];
        if (element.typeAnnotation) {
          properties.methods[key].push({ scope, type: element });
        }
        break;
      }
      case "TSPropertySignature": {
        const key = tryGetKey(element);
        if (!key)
          continue;
        if (!properties.properties[key] && !properties.methods[key]) {
          const type = (_a = element.typeAnnotation) == null ? void 0 : _a.typeAnnotation;
          properties.properties[key] = {
            value: type ? { type, scope } : null,
            optional: !!element.optional,
            signature: { type: element, scope }
          };
        }
        break;
      }
      case "TSIndexSignature":
        break;
    }
  }
  return properties;
}
async function resolveTSReferencedType(ref, stacks = []) {
  var _a;
  const { scope, type } = ref;
  if (stacks.some((stack) => stack.scope === scope && stack.type === type)) {
    return ref;
  }
  stacks.push(ref);
  if (type.type === "TSTypeAliasDeclaration" || type.type === "TSParenthesizedType") {
    return resolveTSReferencedType({ scope, type: type.typeAnnotation }, stacks);
  }
  let refNames;
  if (type.type === "Identifier") {
    refNames = [type.name];
  } else if (type.type === "TSTypeReference") {
    if (type.typeName.type === "Identifier") {
      refNames = [type.typeName.name];
    } else {
      refNames = resolveTSEntityName(type.typeName).map((id) => id.name);
    }
  } else if (type.type === "TSModuleDeclaration" && type.body.type === "TSModuleBlock") {
    return resolveTSExports({ type: type.body, scope });
  } else {
    return { scope, type };
  }
  const [refName, ...restNames] = refNames;
  const { body, file } = resolveTSScope(scope);
  for (let node of body) {
    if (node.type === "ImportDeclaration") {
      const resolved = await resolveTSFileId(node.source.value, file.filePath);
      if (!resolved)
        continue;
      const specifier = node.specifiers.find(
        (specifier2) => specifier2.type === "ImportSpecifier" && specifier2.imported.type === "Identifier" && specifier2.imported.name === refName || specifier2.type === "ImportNamespaceSpecifier" && specifier2.local.name === refName
      );
      if (!specifier)
        continue;
      const exports = await resolveTSExports(await getTSFile(resolved));
      let type2 = exports;
      for (const name of specifier.type === "ImportSpecifier" ? refNames : restNames) {
        type2 = type2 == null ? void 0 : type2[name];
      }
      return type2;
    }
    if (node.type === "ExportNamedDeclaration" && node.declaration)
      node = node.declaration;
    if (isTSDeclaration(node)) {
      if (((_a = node.id) == null ? void 0 : _a.type) !== "Identifier")
        continue;
      if (node.id.name !== refName)
        continue;
      const resolved = await resolveTSReferencedType(
        { scope, type: node },
        stacks
      );
      if (!resolved)
        return;
      if (restNames.length === 0) {
        return resolved;
      } else {
        let exports = resolved;
        for (const name of restNames) {
          exports = exports[name];
        }
        return exports;
      }
    }
  }
  if (type.type === "TSTypeReference")
    return { scope, type };
}
function resolveTSScope(scope) {
  const isFile = "ast" in scope;
  const file = isFile ? scope : resolveTSScope(scope.scope).file;
  const body = isFile ? scope.ast : scope.type.body;
  return {
    isFile,
    file,
    body
  };
}
function resolveTSEntityName(node) {
  if (node.type === "Identifier")
    return [node];
  else {
    return [...resolveTSEntityName(node.left), node.right];
  }
}
var exportsSymbol = Symbol("exports");
var tsFileExportsCache = /* @__PURE__ */ new Map();
function isTSExports(val) {
  return !!val && typeof val === "object" && exportsSymbol in val;
}
async function resolveTSExports(scope) {
  var _a;
  if (tsFileExportsCache.has(scope))
    return tsFileExportsCache.get(scope);
  const exports = {
    [exportsSymbol]: true
  };
  tsFileExportsCache.set(scope, exports);
  const { body, file } = resolveTSScope(scope);
  for (const stmt of body) {
    if (stmt.type === "ExportDefaultDeclaration") {
    } else if (stmt.type === "ExportAllDeclaration") {
      const resolved = await resolveTSFileId(stmt.source.value, file.filePath);
      if (!resolved)
        continue;
      const sourceExports = await resolveTSExports(await getTSFile(resolved));
      Object.assign(exports, sourceExports);
    } else if (stmt.type === "ExportNamedDeclaration") {
      let sourceExports;
      if (stmt.source) {
        const resolved = await resolveTSFileId(stmt.source.value, file.filePath);
        if (!resolved)
          continue;
        sourceExports = await resolveTSExports(await getTSFile(resolved));
      }
      for (const specifier of stmt.specifiers) {
        if (specifier.type === "ExportDefaultSpecifier") {
          continue;
        }
        if (specifier.type === "ExportNamespaceSpecifier") {
          exports[specifier.exported.name] = sourceExports;
        } else {
          const exportedName = specifier.exported.type === "Identifier" ? specifier.exported.name : specifier.exported.value;
          if (stmt.source) {
            exports[exportedName] = sourceExports[specifier.local.name];
          } else {
            exports[exportedName] = await resolveTSReferencedType({
              scope,
              type: specifier.local
            });
          }
        }
      }
      if (isTSDeclaration(stmt.declaration)) {
        const decl = stmt.declaration;
        if (((_a = decl.id) == null ? void 0 : _a.type) === "Identifier") {
          const exportedName = decl.id.name;
          exports[exportedName] = await resolveTSReferencedType({
            scope,
            type: decl
          });
        }
      }
    }
  }
  return exports;
}
var resolveTSFileIdImpl = resolveTSFileIdNode;
function resolveTSFileId(id, importer) {
  return resolveTSFileIdImpl(id, importer);
}
function resolveTSFileIdNode(id, importer) {
  function tryResolve(id2, importer2) {
    const filePath = path.resolve(importer2, "..", id2);
    if (!existsSync(filePath))
      return;
    return filePath;
  }
  return tryResolve(id, importer) || tryResolve(`${id}.ts`, importer) || tryResolve(`${id}/index`, importer) || tryResolve(`${id}/index.ts`, importer);
}
function setResolveTSFileIdImpl(impl) {
  resolveTSFileIdImpl = impl;
}

export {
  tsFileCache,
  getTSFile,
  isTSDeclaration,
  mergeTSProperties,
  resolveTSProperties,
  resolveTypeElements,
  resolveTSReferencedType,
  resolveTSScope,
  resolveTSEntityName,
  exportsSymbol,
  tsFileExportsCache,
  isTSExports,
  resolveTSExports,
  resolveTSFileId,
  resolveTSFileIdNode,
  setResolveTSFileIdImpl
};
