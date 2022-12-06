"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/utils.ts
var keyToString = (key) => {
  if (typeof key === "string")
    return key;
  else
    return key.value;
};



exports.keyToString = keyToString;
