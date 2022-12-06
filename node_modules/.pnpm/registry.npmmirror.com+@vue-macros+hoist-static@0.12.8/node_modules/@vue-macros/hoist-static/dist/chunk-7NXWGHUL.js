"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/index.ts
var _unplugin = require('unplugin');
var _pluginutils = require('@rollup/pluginutils');
var _common = require('@vue-macros/common');

// src/core/index.ts








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
  const ctx = _common.parseSFC.call(void 0, code, id);
  const { scriptSetup, lang } = ctx;
  if (!scriptSetup)
    return;
  const setupOffset = scriptSetup.loc.start.offset;
  const setupOffsetEnd = scriptSetup.loc.end.offset;
  const s = new (0, _common.MagicString)(code);
  const program = _common.babelParse.call(void 0, scriptSetup.loc.source, lang);
  let normalScript = _common.addNormalScript.call(void 0, ctx, s);
  let scriptOffset;
  for (const stmt of program.body) {
    if (stmt.type === "VariableDeclaration" && stmt.kind === "const") {
      const decls = stmt.declarations;
      let count = 0;
      for (const [i, decl] of decls.entries()) {
        if (!decl.init || !_common.isStaticExpression.call(void 0, decl.init, {
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
        (member) => !member.initializer || _common.isStaticExpression.call(void 0, member.initializer, {
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
  return _common.getTransformResult.call(void 0, s, id);
};

// src/index.ts
function resolveOption(options) {
  return {
    include: [_common.REGEX_VUE_SFC, _common.REGEX_SETUP_SFC],
    ...options
  };
}
var name = "unplugin-vue-hoist-static";
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
        return transformHoistStatic(code, id);
      } catch (err) {
        this.error(`${name} ${err}`);
      }
    }
  };
});



exports.src_default = src_default;
