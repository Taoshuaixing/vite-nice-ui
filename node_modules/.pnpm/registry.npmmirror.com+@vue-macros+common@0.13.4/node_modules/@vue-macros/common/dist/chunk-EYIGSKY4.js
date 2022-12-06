"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _chunkUDPJYA4Djs = require('./chunk-UDPJYA4D.js');

// src/lang.ts
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
function getLang(filename) {
  return _path2.default.extname(filename).replace(/^\./, "");
}
function isTs(lang) {
  return lang && _chunkUDPJYA4Djs.REGEX_TS_FILE.test(lang);
}




exports.getLang = getLang; exports.isTs = isTs;
