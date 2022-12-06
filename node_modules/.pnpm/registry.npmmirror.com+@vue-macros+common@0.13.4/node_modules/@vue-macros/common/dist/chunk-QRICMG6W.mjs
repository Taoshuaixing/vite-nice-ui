// src/vue.ts
import { compileScript, parse } from "@vue/compiler-sfc";
var parseSFC = (code, id) => {
  var _a;
  const sfc = parse(code, {
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
      return scriptCompiled = compileScript(descriptor, {
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

export {
  parseSFC,
  addNormalScript
};
