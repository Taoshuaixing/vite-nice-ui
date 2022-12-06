// src/utils.ts
var keyToString = (key) => {
  if (typeof key === "string")
    return key;
  else
    return key.value;
};

export {
  keyToString
};
