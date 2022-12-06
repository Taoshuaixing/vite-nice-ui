"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/index.ts
var _unplugin = require('unplugin');
var _pluginutils = require('@rollup/pluginutils');
var _common = require('@vue-macros/common');

// src/core/index.ts







var transfromDefineSlots = (code, id) => {
  if (!code.includes(_common.DEFINE_SLOTS))
    return;
  const sfc = _common.parseSFC.call(void 0, code, id);
  if (!sfc.scriptSetup || !sfc.scriptCompiled.scriptSetupAst)
    return;
  const { scriptSetupAst } = sfc.scriptCompiled;
  const s = new (0, _common.MagicString)(code);
  for (const stmt of scriptSetupAst) {
    if (stmt.type === "ExpressionStatement" && _common.isCallOf.call(void 0, stmt.expression, _common.DEFINE_SLOTS)) {
      s.overwriteNode(stmt, "/*defineSlots*/", {
        offset: sfc.scriptSetup.loc.start.offset
      });
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
var name = "unplugin-vue-define-slots";
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
        return transfromDefineSlots(code, id);
      } catch (err) {
        this.error(`${name} ${err}`);
      }
    }
  };
});



exports.src_default = src_default;
