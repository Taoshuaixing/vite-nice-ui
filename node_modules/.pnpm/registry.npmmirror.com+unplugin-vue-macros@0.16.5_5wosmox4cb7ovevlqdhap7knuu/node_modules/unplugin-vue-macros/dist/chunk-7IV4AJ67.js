"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/utils.ts
var _localpkg = require('local-pkg');
var getVueVersion = () => {
  const vuePkg = _localpkg.getPackageInfoSync.call(void 0, "vue");
  if (vuePkg) {
    return +vuePkg.version.slice(0, 1);
  } else {
    return 3;
  }
};



exports.getVueVersion = getVueVersion;
