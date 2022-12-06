"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/index.ts
var _unplugin = require('unplugin');
var _pluginutils = require('@rollup/pluginutils');
var _common = require('@vue-macros/common');

// src/core/index.ts










var transfromDefineProps = (code, id) => {
  if (!code.includes(_common.DEFINE_PROPS_DOLLAR))
    return;
  const { scriptSetup, lang } = _common.parseSFC.call(void 0, code, id);
  if (!scriptSetup)
    return;
  const offset = scriptSetup.loc.start.offset;
  const s = new (0, _common.MagicString)(code);
  const program = _common.babelParse.call(void 0, scriptSetup.loc.source, lang);
  _common.walkAST.call(void 0, program, {
    enter(node) {
      if (_common.isCallOf.call(void 0, node, _common.DEFINE_PROPS_DOLLAR)) {
        s.overwriteNode(
          node.callee,
          ` ${_common.DEFINE_PROPS}`,
          { offset }
        );
      }
    }
  });
  return _common.getTransformResult.call(void 0, s, id);
};

// src/index.ts
function resolveOption(options) {
  return {
    include: [_common.REGEX_VUE_SFC, _common.REGEX_SETUP_SFC],
    ...options
  };
}
var name = "unplugin-vue-define-props";
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
        return transfromDefineProps(code, id);
      } catch (err) {
        this.error(`${name} ${err}`);
      }
    }
  };
});




exports.transfromDefineProps = transfromDefineProps; exports.src_default = src_default;
