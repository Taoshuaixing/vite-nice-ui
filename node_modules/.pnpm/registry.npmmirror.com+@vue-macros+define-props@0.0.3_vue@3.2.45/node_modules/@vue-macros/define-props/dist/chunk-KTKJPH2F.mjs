// src/index.ts
import { createUnplugin } from "unplugin";
import { createFilter } from "@rollup/pluginutils";
import { REGEX_SETUP_SFC, REGEX_VUE_SFC } from "@vue-macros/common";

// src/core/index.ts
import {
  DEFINE_PROPS,
  DEFINE_PROPS_DOLLAR,
  MagicString,
  babelParse,
  getTransformResult,
  isCallOf,
  parseSFC,
  walkAST
} from "@vue-macros/common";
var transfromDefineProps = (code, id) => {
  if (!code.includes(DEFINE_PROPS_DOLLAR))
    return;
  const { scriptSetup, lang } = parseSFC(code, id);
  if (!scriptSetup)
    return;
  const offset = scriptSetup.loc.start.offset;
  const s = new MagicString(code);
  const program = babelParse(scriptSetup.loc.source, lang);
  walkAST(program, {
    enter(node) {
      if (isCallOf(node, DEFINE_PROPS_DOLLAR)) {
        s.overwriteNode(
          node.callee,
          ` ${DEFINE_PROPS}`,
          { offset }
        );
      }
    }
  });
  return getTransformResult(s, id);
};

// src/index.ts
function resolveOption(options) {
  return {
    include: [REGEX_VUE_SFC, REGEX_SETUP_SFC],
    ...options
  };
}
var name = "unplugin-vue-define-props";
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
        return transfromDefineProps(code, id);
      } catch (err) {
        this.error(`${name} ${err}`);
      }
    }
  };
});

export {
  transfromDefineProps,
  src_default
};
