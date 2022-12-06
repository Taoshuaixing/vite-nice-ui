import {
  REGEX_TS_FILE
} from "./chunk-HNRHZMFS.mjs";

// src/lang.ts
import path from "path";
function getLang(filename) {
  return path.extname(filename).replace(/^\./, "");
}
function isTs(lang) {
  return lang && REGEX_TS_FILE.test(lang);
}

export {
  getLang,
  isTs
};
