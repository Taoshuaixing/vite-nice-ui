// src/index.ts
import { createUnplugin } from "unplugin";
import { createFilter } from "@rollup/pluginutils";
import { REGEX_VUE_SFC } from "@vue-macros/common";
import { createCombinePlugin } from "unplugin-combine";
import { parseVueRequest as parseVueRequest2 } from "@vitejs/plugin-vue";

// src/core/index.ts
import {
  MagicString,
  babelParse,
  getLang,
  getTransformResult,
  isCallOf,
  walkAST
} from "@vue-macros/common";
import { createTransformContext, parse, traverseNode } from "@vue/compiler-dom";
import { parseVueRequest } from "@vitejs/plugin-vue";

// src/core/constants.ts
var QUERY_NAMED_TEMPLATE = "?vue&type=named-template";
var QUERY_TEMPLATE = "type=template&namedTemplate";
var QUERY_TEMPLATE_MAIN = `${QUERY_TEMPLATE}&mainTemplate`;
var MAIN_TEMPLATE = Symbol();

// src/core/utils.ts
function getChildrenLocation(node) {
  if (node.children.length > 0) {
    const lastChild = node.children[node.children.length - 1];
    return [node.children[0].loc.start.offset, lastChild.loc.end.offset];
  } else {
    return void 0;
  }
}

// src/core/index.ts
var transformTemplateIs = (s) => (node) => {
  if (!(node.type === 1 && node.tag === "template"))
    return;
  const propIs = node.props.find(
    (prop) => prop.type === 6 && prop.name === "is"
  );
  if (!(propIs == null ? void 0 : propIs.value))
    return;
  const refName = propIs.value.content;
  s.overwrite(
    node.loc.start.offset,
    node.loc.end.offset,
    `<component is="named-template-${refName}" />`
  );
};
var preTransform = (code, id, templateContent) => {
  const root = parse(code);
  const templates = root.children.filter(
    (node) => node.type === 1 && node.tag === "template"
  );
  if (templates.length <= 1)
    return;
  const s = new MagicString(code);
  for (const node of templates) {
    const propName = node.props.find(
      (prop) => prop.type === 6 && prop.name === "name"
    );
    if (!propName) {
      preTransformMainTemplate(s, root, node, id, templateContent);
      continue;
    } else if (!propName.value) {
      continue;
    }
    const name2 = propName.value.content;
    let template = "";
    const templateLoc = getChildrenLocation(node);
    if (templateLoc) {
      template = s.slice(...templateLoc);
    }
    if (!templateContent[id])
      templateContent[id] = {};
    templateContent[id][name2] = template;
    s.appendLeft(node.loc.start.offset, `<named-template name="${name2}">`);
    s.appendLeft(node.loc.end.offset, "</named-template>");
  }
  return getTransformResult(s, id);
};
function preTransformMainTemplate(s, root, node, id, templateContent) {
  const ctx = createTransformContext(root, {
    filename: id,
    nodeTransforms: [transformTemplateIs(s)]
  });
  traverseNode(node, ctx);
  const loc = getChildrenLocation(node);
  if (!loc)
    return;
  if (!templateContent[id])
    templateContent[id] = {};
  templateContent[id][MAIN_TEMPLATE] = s.slice(...loc);
  s.remove(...loc);
  const offset = node.loc.start.offset + 1 + node.tag.length;
  s.appendLeft(offset, ` src="${`${id}?vue&${QUERY_TEMPLATE_MAIN}`}"`);
}
var postTransform = (code, id, customBlocks) => {
  var _a, _b, _c;
  const lang = getLang(id);
  const program = babelParse(code, lang);
  const { filename } = parseVueRequest(id);
  if (!id.includes(QUERY_TEMPLATE_MAIN)) {
    postTransformMainEntry(program, filename, customBlocks);
    return;
  }
  const s = new MagicString(code);
  const subTemplates = [];
  for (const node of program.body) {
    if (node.type === "ExportNamedDeclaration" && ((_a = node.declaration) == null ? void 0 : _a.type) === "FunctionDeclaration" && ((_b = node.declaration.id) == null ? void 0 : _b.name) === "render") {
      const params = node.declaration.params;
      if (params.length > 0) {
        const lastParams = params[node.declaration.params.length - 1];
        const loc = [params[0].start, lastParams.end];
        const paramsText = s.slice(...loc);
        s.overwrite(...loc, "...args");
        s.appendLeft(
          node.declaration.body.start + 1,
          `
 let [${paramsText}] = args`
        );
      }
    }
  }
  walkAST(program, {
    enter(node) {
      if (isCallOf(node, ["_createVNode", "_createBlock"]) && isCallOf(node.arguments[0], "_resolveDynamicComponent") && node.arguments[0].arguments[0].type === "StringLiteral" && node.arguments[0].arguments[0].value.startsWith("named-template-")) {
        subTemplates.push({
          vnode: node,
          component: node.arguments[0],
          name: node.arguments[0].arguments[0].value.replace(
            "named-template-",
            ""
          ),
          fnName: node.callee.name
        });
      }
    }
  });
  if (subTemplates.length === 0)
    return;
  let importFragment = false;
  for (const { vnode, component, name: name2, fnName } of subTemplates) {
    const block = (_c = customBlocks[filename]) == null ? void 0 : _c[name2];
    if (!block)
      throw new SyntaxError(`Unknown named template: ${name2}`);
    const render = `_NT_block_${name2}.render(...args)`;
    if (fnName === "_createVNode") {
      s.overwriteNode(vnode, render);
    } else if (fnName === "_createBlock") {
      s.overwriteNode(component, "_NT_Fragment");
      const text = `${vnode.arguments[1] ? "" : ", null"}, [${render}]`;
      s.appendLeft((vnode.arguments[1] || vnode.arguments[0]).end, text);
      importFragment = true;
    }
  }
  for (const [name2, source] of Object.entries(customBlocks[filename])) {
    s.prepend(
      `import { default as _NT_block_${name2} } from ${JSON.stringify(source)}
`
    );
  }
  if (importFragment) {
    s.prepend(`import { Fragment as _NT_Fragment } from 'vue'
`);
  }
  return getTransformResult(s, id);
};
var postTransformMainEntry = (program, id, customBlocks) => {
  for (const node of program.body) {
    if (node.type === "ImportDeclaration" && node.source.value.includes(QUERY_NAMED_TEMPLATE)) {
      const { name: name2 } = parseVueRequest(node.source.value).query;
      if (!customBlocks[id])
        customBlocks[id] = {};
      customBlocks[id][name2] = node.source.value;
    }
  }
};

// src/index.ts
function resolveOption(options) {
  return {
    include: [REGEX_VUE_SFC],
    ...options
  };
}
var name = "unplugin-vue-named-template";
var PrePlugin = createUnplugin(
  (userOptions = {}) => {
    const options = resolveOption(userOptions);
    const filter = createFilter(options.include, options.exclude);
    const templateContent = {};
    return {
      name: `${name}-pre`,
      enforce: "pre",
      loadInclude(id) {
        return id.includes(QUERY_TEMPLATE);
      },
      load(id) {
        var _a;
        const { filename, query } = parseVueRequest2(id);
        const content = (_a = templateContent[filename]) == null ? void 0 : _a["mainTemplate" in query ? MAIN_TEMPLATE : query.name];
        return content;
      },
      transformInclude(id) {
        return filter(id) || id.includes(QUERY_NAMED_TEMPLATE);
      },
      transform(code, id) {
        try {
          if (id.includes(QUERY_NAMED_TEMPLATE)) {
            const { filename, query } = parseVueRequest2(id);
            const { name: name2 } = query;
            const request = `${filename}?vue&${QUERY_TEMPLATE}&name=${name2}`;
            return `import { createTextVNode } from 'vue'
          import { render } from ${JSON.stringify(request)}
export default {
  render: (...args) => {
    const r = render(...args)
    return typeof r === 'string' ? createTextVNode(r) : r
  }
}`;
          } else {
            return preTransform(code, id, templateContent);
          }
        } catch (err) {
          this.error(`${name} ${err}`);
        }
      }
    };
  }
);
var PostPlugin = createUnplugin(
  (userOptions = {}) => {
    const options = resolveOption(userOptions);
    const filter = createFilter(options.include, options.exclude);
    const customBlocks = {};
    function transformInclude(id) {
      return filter(id) || id.includes(QUERY_TEMPLATE);
    }
    return {
      name: `${name}-post`,
      enforce: "post",
      transformInclude,
      transform(code, id) {
        return postTransform(code, id, customBlocks);
      },
      rollup: {
        transform: {
          order: "post",
          handler(code, id) {
            if (!transformInclude(id))
              return;
            return postTransform(code, id, customBlocks);
          }
        }
      }
    };
  }
);
var plugin = createCombinePlugin((userOptions = {}) => {
  return {
    name,
    plugins: [
      [PrePlugin, userOptions],
      [PostPlugin, userOptions]
    ]
  };
});
var src_default = plugin;

export {
  PrePlugin,
  PostPlugin,
  src_default
};
