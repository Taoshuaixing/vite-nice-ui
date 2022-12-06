// src/utils.ts
import { getPackageInfoSync } from "local-pkg";
var getVueVersion = () => {
  const vuePkg = getPackageInfoSync("vue");
  if (vuePkg) {
    return +vuePkg.version.slice(0, 1);
  } else {
    return 3;
  }
};

export {
  getVueVersion
};
