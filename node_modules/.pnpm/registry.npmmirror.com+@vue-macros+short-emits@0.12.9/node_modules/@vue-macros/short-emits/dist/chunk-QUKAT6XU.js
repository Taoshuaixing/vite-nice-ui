"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/index.ts
var _unplugin = require('unplugin');
var _pluginutils = require('@rollup/pluginutils');
var _common = require('@vue-macros/common');

// src/core/index.ts









var transformShortEmits = (code, id) => {
  if (!code.includes("SE") && !code.includes("ShortEmits"))
    return;
  const ctx = _common.parseSFC.call(void 0, code, id);
  const { scriptSetup, lang } = ctx;
  if (!scriptSetup || !_common.isTs.call(void 0, lang))
    return;
  const offset = scriptSetup.loc.start.offset;
  const program = _common.babelParse.call(void 0, scriptSetup.loc.source, lang);
  const nodes = [];
  _common.walkAST.call(void 0, program, {
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
  const s = new (0, _common.MagicString)(code);
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
      const key = _common.resolveObjectKey.call(void 0, member.key, member.computed);
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
  return _common.getTransformResult.call(void 0, s, id);
};

// src/index.ts
function resolveOption(options) {
  return {
    include: [_common.REGEX_VUE_SFC, _common.REGEX_SETUP_SFC],
    ...options
  };
}
var name = "unplugin-vue-short-emits";
var src_default = _unplugin.createUnplugin.call(void 0, (userOptions = {}) => {
  const options = resolveOption(userOptions);
  const filter = _pluginutils.createFilter.call(void 0, options.include, options.exclude);
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



exports.src_default = src_default;
