// src/index.ts
import { createUnplugin } from "unplugin";
import { createFilter } from "@rollup/pluginutils";
import { REGEX_SETUP_SFC } from "@vue-macros/common";

// src/core/index.ts
import {
  MagicString,
  babelParse,
  getLang,
  getTransformResult
} from "@vue-macros/common";
var transfromSetupSFC = (code, id) => {
  const lang = getLang(id);
  const program = babelParse(code, lang);
  const s = new MagicString(code);
  for (const stmt of program.body) {
    if (stmt.type !== "ExportDefaultDeclaration")
      continue;
    s.append(`defineRender(${s.sliceNode(stmt.declaration)});`);
    s.removeNode(stmt);
  }
  const attrs = `${lang ? ` lang="${lang}"` : ""}`;
  s.prepend(`<script setup${attrs}>`);
  s.append(`<\/script>`);
  return getTransformResult(s, id);
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
    include: [REGEX_SETUP_SFC],
    ...options
  };
}
var name = "unplugin-vue-setup-sfc";
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

export {
  src_default
};
