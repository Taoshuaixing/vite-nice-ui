// src/unplugin.ts
var getTransformResult = (s, id) => {
  if (s == null ? void 0 : s.hasChanged()) {
    return {
      code: s.toString(),
      get map() {
        return s.generateMap({
          source: id,
          includeContent: true,
          hires: true
        });
      }
    };
  }
};

export {
  getTransformResult
};
