// src/index.ts
import { createUnplugin } from "unplugin";
import { createFilter } from "@rollup/pluginutils";
import { REGEX_SETUP_SFC, REGEX_VUE_SFC } from "@vue-macros/common";

// src/core/index.ts
import {
  MagicString,
  addNormalScript,
  babelParse,
  getTransformResult,
  isStaticExpression,
  parseSFC
} from "@vue-macros/common";
var MAGIC_COMMENT = "hoist-static";
var transformHoistStatic = (code, id) => {
  function moveToScript(decl, prefix = "") {
    if (scriptOffset === void 0)
      scriptOffset = normalScript.start();
    const text = `
${prefix}${s.sliceNode(decl, { offset: setupOffset })}`;
    s.appendRight(scriptOffset, text);
    s.removeNode(decl, { offset: setupOffset });
  }
  const ctx = parseSFC(code, id);
  const { scriptSetup, lang } = ctx;
  if (!scriptSetup)
    return;
  const setupOffset = scriptSetup.loc.start.offset;
  const setupOffsetEnd = scriptSetup.loc.end.offset;
  const s = new MagicString(code);
  const program = babelParse(scriptSetup.loc.source, lang);
  let normalScript = addNormalScript(ctx, s);
  let scriptOffset;
  for (const stmt of program.body) {
    if (stmt.type === "VariableDeclaration" && stmt.kind === "const") {
      const decls = stmt.declarations;
      let count = 0;
      for (const [i, decl] of decls.entries()) {
        if (!decl.init || !isStaticExpression(decl.init, {
          unary: true,
          magicComment: MAGIC_COMMENT
        }))
          continue;
        count++;
        moveToScript(decl, "const ");
        if (decls.length > 1) {
          const isLast = i === decls.length - 1;
          const start = isLast ? decls[i - 1].end : decl.end;
          const end = isLast ? decl.start : decls[i + 1].start;
          s.remove(setupOffset + start, setupOffset + end);
        }
      }
      if (count === decls.length) {
        s.removeNode(stmt, { offset: setupOffset });
      }
    } else if (stmt.type === "TSEnumDeclaration") {
      const isAllConstant = stmt.members.every(
        (member) => !member.initializer || isStaticExpression(member.initializer, {
          unary: true,
          magicComment: MAGIC_COMMENT
        })
      );
      if (!isAllConstant)
        continue;
      moveToScript(stmt);
    }
  }
  const restSetup = s.slice(setupOffset, setupOffsetEnd);
  if (restSetup.trim().length === 0) {
    s.appendLeft(setupOffsetEnd, "/* hoist static placeholder */");
  }
  if (scriptOffset !== void 0)
    normalScript.end();
  return getTransformResult(s, id);
};

// src/index.ts
function resolveOption(options) {
  return {
    include: [REGEX_VUE_SFC, REGEX_SETUP_SFC],
    ...options
  };
}
var name = "unplugin-vue-hoist-static";
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
        return transformHoistStatic(code, id);
      } catch (err) {
        this.error(`${name} ${err}`);
      }
    }
  };
});

export {
  src_default
};
