"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/index.ts
var _unplugin = require('unplugin');
var _pluginutils = require('@rollup/pluginutils');
var _common = require('@vue-macros/common');

// src/core/index.ts






var transfromSetupSFC = (code, id) => {
  const lang = _common.getLang.call(void 0, id);
  const program = _common.babelParse.call(void 0, code, lang);
  const s = new (0, _common.MagicString)(code);
  for (const stmt of program.body) {
    if (stmt.type !== "ExportDefaultDeclaration")
      continue;
    s.append(`defineRender(${s.sliceNode(stmt.declaration)});`);
    s.removeNode(stmt);
  }
  const attrs = `${lang ? ` lang="${lang}"` : ""}`;
  s.prepend(`<script setup${attrs}>`);
  s.append(`<\/script>`);
  return _common.getTransformResult.call(void 0, s, id);
};
var hotUpdateSetupSFC = ({ modules }, filter) => {
  function isSubModule(id) {
    const [filename, query] = id.split("?");
    if (!query)
      return false;
    if (!filter(filename))
      return false;
    return true;
  }
  const affectedModules = modules.filter((mod) => mod.id && isSubModule(mod.id));
  return affectedModules;
};

// src/index.ts
function resolveOption(options) {
  return {
    include: [_common.REGEX_SETUP_SFC],
    ...options
  };
}
var name = "unplugin-vue-setup-sfc";
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
        return transfromSetupSFC(code, id);
      } catch (err) {
        this.error(`${name} ${err}`);
      }
    },
    vite: {
      config() {
        return {
          esbuild: {
            exclude: options.include,
            include: options.exclude
          }
        };
      },
      handleHotUpdate: (ctx) => {
        if (filter(ctx.file)) {
          return hotUpdateSetupSFC(ctx, filter);
        }
      }
    }
  };
});



exports.src_default = src_default;
