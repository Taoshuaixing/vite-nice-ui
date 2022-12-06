// src/index.ts
import { createUnplugin } from "unplugin";
import { createFilter } from "@rollup/pluginutils";
import { REGEX_SETUP_SFC, REGEX_VUE_SFC } from "@vue-macros/common";

// src/core/index.ts
import {
  MagicString,
  babelParse,
  getTransformResult,
  isTs,
  parseSFC,
  resolveObjectKey,
  walkAST
} from "@vue-macros/common";
var transformShortEmits = (code, id) => {
  if (!code.includes("SE") && !code.includes("ShortEmits"))
    return;
  const ctx = parseSFC(code, id);
  const { scriptSetup, lang } = ctx;
  if (!scriptSetup || !isTs(lang))
    return;
  const offset = scriptSetup.loc.start.offset;
  const program = babelParse(scriptSetup.loc.source, lang);
  const nodes = [];
  walkAST(program, {
    enter(node) {
      var _a;
      if (node.type === "TSTypeReference" && node.typeName.type === "Identifier" && ["SE", "ShortEmits"].includes(node.typeName.name) && ((_a = node.typeParameters) == null ? void 0 : _a.params[0].type)) {
        nodes.push({
          def: node.typeParameters.params[0],
          type: node
        });
      }
    }
  });
  const s = new MagicString(code);
  function stringifyParams(params) {
    return params.length > 0 ? s.sliceNodes(params, { offset }) : "";
  }
  for (const { def, type } of nodes) {
    if (def.type !== "TSTypeLiteral")
      throw new SyntaxError(
        `accepts object literal only: ${s.sliceNode(def, { offset })}`
      );
    s.remove(offset + type.start, offset + def.start);
    s.remove(offset + def.end, offset + type.end);
    for (const _member of def.members) {
      if (!["TSPropertySignature", "TSMethodSignature"].includes(_member.type))
        throw new SyntaxError(
          `accepts method and property only: ${s.sliceNode(_member, {
            offset
          })}`
        );
      const member = _member;
      const key = resolveObjectKey(member.key, member.computed);
      let params = "";
      switch (member.type) {
        case "TSPropertySignature": {
          if (!member.typeAnnotation || !["TSTupleType", "TSFunctionType"].includes(
            member.typeAnnotation.typeAnnotation.type
          ))
            throw new SyntaxError(
              `not supported: ${s.sliceNode(member, { offset })}`
            );
          switch (member.typeAnnotation.typeAnnotation.type) {
            case "TSTupleType":
              params = `...args: ${s.sliceNode(
                member.typeAnnotation.typeAnnotation,
                { offset }
              )}`;
              break;
            case "TSFunctionType":
              params = stringifyParams(
                member.typeAnnotation.typeAnnotation.parameters
              );
              break;
          }
          break;
        }
        case "TSMethodSignature": {
          params = stringifyParams(member.parameters);
          break;
        }
      }
      s.overwriteNode(
        member,
        `(evt: ${key}${params ? `, ${params}` : ""}): void`,
        { offset }
      );
    }
  }
  return getTransformResult(s, id);
};

// src/index.ts
function resolveOption(options) {
  return {
    include: [REGEX_VUE_SFC, REGEX_SETUP_SFC],
    ...options
  };
}
var name = "unplugin-vue-short-emits";
var src_default = createUnplugin((userOptions = {}) => {
  const options = resolveOption(userOptions);
  const filter = createFilter(options.include, options.exclude);
  return {
    name,
    enforce: "pre",
    transformInclude(id) {
      return filter(id);
    },
    transform(code, id) {
      try {
        return transformShortEmits(code, id);
      } catch (err) {
        this.error(`${name} ${err}`);
      }
    }
  };
});

export {
  src_default
};
