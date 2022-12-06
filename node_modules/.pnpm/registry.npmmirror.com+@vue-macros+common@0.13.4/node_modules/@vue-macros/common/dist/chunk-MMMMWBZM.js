"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/vue.ts
var _compilersfc = require('@vue/compiler-sfc');
var parseSFC = (code, id) => {
  var _a;
  const sfc = _compilersfc.parse.call(void 0, code, {
    filename: id
  });
  const { descriptor, errors } = sfc;
  const lang = (_a = descriptor.script || descriptor.scriptSetup) == null ? void 0 : _a.lang;
  let scriptCompiled;
  return {
    sfc,
    ...descriptor,
    lang,
    errors,
    get scriptCompiled() {
      if (scriptCompiled)
        return scriptCompiled;
      return scriptCompiled = _compilersfc.compileScript.call(void 0, descriptor, {
        id
      });
    }
  };
};
var addNormalScript = ({ script, lang }, s) => {
  return {
    start() {
      if (script)
        return script.loc.end.offset;
      const attrs = lang ? ` lang="${lang}"` : "";
      s.prependLeft(0, `<script${attrs}>`);
      return 0;
    },
    end() {
      if (!script)
        s.appendRight(0, `
<\/script>
`);
    }
  };
};




exports.parseSFC = parseSFC; exports.addNormalScript = addNormalScript;
