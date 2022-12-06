// src/index.ts
import { createUnplugin } from "unplugin";
import { createFilter } from "@rollup/pluginutils";
import { REGEX_SETUP_SFC, REGEX_VUE_SFC } from "@vue-macros/common";

// src/core/index.ts
import {
  DEFINE_SLOTS,
  MagicString,
  getTransformResult,
  isCallOf,
  parseSFC
} from "@vue-macros/common";
var transfromDefineSlots = (code, id) => {
  if (!code.includes(DEFINE_SLOTS))
    return;
  const sfc = parseSFC(code, id);
  if (!sfc.scriptSetup || !sfc.scriptCompiled.scriptSetupAst)
    return;
  const { scriptSetupAst } = sfc.scriptCompiled;
  const s = new MagicString(code);
  for (const stmt of scriptSetupAst) {
    if (stmt.type === "ExpressionStatement" && isCallOf(stmt.expression, DEFINE_SLOTS)) {
      s.overwriteNode(stmt, "/*defineSlots*/", {
        offset: sfc.scriptSetup.loc.start.offset
      });
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
var name = "unplugin-vue-define-slots";
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
        return transfromDefineSlots(code, id);
      } catch (err) {
        this.error(`${name} ${err}`);
      }
    }
  };
});

export {
  src_default
};
