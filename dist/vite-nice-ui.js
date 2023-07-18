import { defineComponent, computed, openBlock, createElementBlock, normalizeClass, createElementVNode, withModifiers, normalizeStyle, withDirectives, vShow, renderSlot, createTextVNode, toDisplayString, useSlots, ref, createBlock, unref, createCommentVNode, createVNode, Transition, withCtx, useCssVars, watch, Fragment, renderList, pushScopeId, popScopeId, watchEffect, resolveComponent, onMounted, createStaticVNode } from "vue";
import NIcon from "vue-feather";
import { default as default2 } from "vue-feather";
const _hoisted_1$8 = ["href", "target", "disabled"];
const _hoisted_2$4 = { class: "u-spin-circle" };
const _hoisted_3$4 = { class: "u-text" };
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "NButton",
  props: {
    name: { default: "" },
    type: { default: "default" },
    effect: { default: "fade" },
    size: { default: "middle" },
    width: { default: 0 },
    height: { default: 0 },
    borderRadius: { default: 5 },
    route: { default: () => {
      return {};
    } },
    target: { default: "_self" },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    center: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const isRoute = computed(() => {
      if (JSON.stringify(props.route) === "{}") {
        return false;
      } else {
        return true;
      }
    });
    function getUrl(route) {
      var targetUrl = route.path;
      if (route.query && JSON.stringify(route.query) !== "{}") {
        const query = route.query;
        Object.keys(query).forEach((param, index) => {
          if (index === 0) {
            targetUrl = targetUrl + "?" + param + "=" + query[param];
          } else {
            targetUrl = targetUrl + "&" + param + "=" + query[param];
          }
        });
      }
      return targetUrl;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["n-btn-wrap", { center: _ctx.center }])
      }, [
        createElementVNode("a", {
          onClick: _cache[0] || (_cache[0] = withModifiers(($event) => isRoute.value ? () => false : _ctx.$emit("click", $event), ["stop"])),
          href: getUrl(_ctx.route),
          target: isRoute.value ? _ctx.target : "_self",
          disabled: _ctx.disabled,
          class: normalizeClass(["n-btn", [_ctx.type, _ctx.size, { [_ctx.effect]: _ctx.type === "default", widthType: _ctx.width, disabled: _ctx.disabled, "n-btn-loading": !isRoute.value && _ctx.loading }]]),
          style: normalizeStyle(`border-radius: ${_ctx.borderRadius}px; width: ${_ctx.width ? _ctx.width + "px" : "auto"}; height: ${_ctx.height ? _ctx.height + "px" : "auto"}; line-height: ${_ctx.height - 2}px;`)
        }, [
          withDirectives(createElementVNode("span", {
            class: normalizeClass(["n-loading-icon", { "show-spin": _ctx.loading }])
          }, [
            withDirectives(createElementVNode("span", _hoisted_2$4, null, 512), [
              [vShow, _ctx.loading]
            ])
          ], 2), [
            [vShow, !isRoute.value]
          ]),
          createElementVNode("span", _hoisted_3$4, [
            renderSlot(_ctx.$slots, "default", {}, () => [
              createTextVNode(toDisplayString(_ctx.name), 1)
            ], true)
          ])
        ], 14, _hoisted_1$8)
      ], 2);
    };
  }
});
const NButton_vue_vue_type_style_index_0_scoped_0e325af7_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const NButton = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-0e325af7"]]);
NIcon.name = "NIcon";
const _hoisted_1$7 = ["type", "value", "disabled", "placeholder", "autofocus", "readonly", "form"];
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "NInput",
  props: {
    modelValue: { default: "" },
    disabled: { type: Boolean, default: false },
    clearable: { type: Boolean, default: false },
    showPassword: { type: Boolean, default: false },
    type: { default: "" },
    size: { default: "default" },
    leftIcon: { default: "" },
    rightIcon: { default: "" },
    placeholder: { default: "" },
    autofocus: { type: Boolean, default: false },
    focusColor: { default: "#9708cc" },
    readonly: { type: Boolean, default: false },
    form: { default: "" }
  },
  emits: ["update:modelValue", "clear", "focus", "blur", "input", "change"],
  setup(__props, { emit }) {
    const props = __props;
    const slot = useSlots();
    const isStyle = ref({});
    const inptype = ref(props.type);
    let focusStyle = {
      width: !!slot.btn ? "auto" : "100%",
      float: !!slot.btn ? "left" : "auto",
      "border-radius": !!slot.btn ? "4px 0 0 4px" : "4px",
      "border-color": "#dcdfe6f6"
    };
    isStyle.value = focusStyle;
    const focus = (e) => {
      focusStyle["border-color"] = "#9708CC";
      isStyle.value = {
        width: !!slot.btn ? "auto" : "100%",
        float: !!slot.btn ? "left" : "auto",
        "border-radius": !!slot.btn ? "4px 0 0 4px" : "4px",
        "border-color": props.focusColor
      };
      emit("focus", e);
    };
    const blur = (e) => {
      isStyle.value = {
        width: !!slot.btn ? "auto" : "100%",
        float: !!slot.btn ? "left" : "auto",
        "border-radius": !!slot.btn ? "4px 0 0 4px" : "4px"
      };
      emit("blur", e);
    };
    const iptChange = (e) => {
      emit("update:modelValue", e.target.value);
      emit("input", e.target.value);
    };
    const change = (e) => {
      emit("change", e);
    };
    const clear = () => {
      emit("update:modelValue", "");
      emit("clear");
    };
    const showPwd = (e) => {
      if (inptype.value == "text") {
        inptype.value = "password";
      } else {
        inptype.value = "text";
      }
      console.log(e);
    };
    const isClass = computed(() => {
      return [
        props.clearable ? "nice-input-clearable" : props.size == "default" ? "nice-input-default" : `nice-input-${props.size}`,
        props.leftIcon != "" ? `nice-input-left-icon-${props.size}` : !props.clearable ? props.rightIcon != "" ? `nice-input-right-icon-${props.size}` : "" : "",
        props.disabled ? "nice-input-disabled" : "",
        props.type == "password" ? props.showPassword ? `nice-input-password-showpassword-${props.size}` : `nice-input-password-${props.size}` : ""
      ];
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([`nice-group-input-${_ctx.size}`]),
        style: { "min-width": "auto" }
      }, [
        createElementVNode("div", {
          class: normalizeClass(isClass.value),
          style: normalizeStyle([isStyle.value, {}])
        }, [
          !_ctx.showPassword && _ctx.leftIcon != "" ? (openBlock(), createBlock(unref(NIcon), {
            key: 0,
            class: normalizeClass(["left-icon"]),
            type: _ctx.leftIcon
          }, null, 8, ["type"])) : createCommentVNode("", true),
          createElementVNode("input", {
            type: inptype.value,
            onFocus: focus,
            onBlur: blur,
            value: _ctx.modelValue,
            onInput: iptChange,
            disabled: _ctx.disabled,
            onChange: change,
            placeholder: _ctx.placeholder,
            autofocus: _ctx.autofocus,
            readonly: _ctx.readonly,
            form: _ctx.form
          }, null, 40, _hoisted_1$7),
          createVNode(Transition, { name: "slide-fade" }, {
            default: withCtx(() => [
              !_ctx.showPassword && _ctx.clearable && _ctx.modelValue != "" ? (openBlock(), createBlock(unref(NIcon), {
                key: 0,
                type: "x",
                class: "clearable-icon",
                onClick: clear
              })) : createCommentVNode("", true)
            ]),
            _: 1
          }),
          !_ctx.showPassword && _ctx.rightIcon != "" ? (openBlock(), createBlock(unref(NIcon), {
            key: 1,
            class: normalizeClass(["right-icon"]),
            type: _ctx.rightIcon
          }, null, 8, ["type"])) : createCommentVNode("", true),
          _ctx.showPassword ? (openBlock(), createBlock(unref(NIcon), {
            key: 2,
            type: "eye-off",
            class: normalizeClass(["password-icon"]),
            onClick: _cache[0] || (_cache[0] = ($event) => showPwd(_ctx.type))
          })) : createCommentVNode("", true)
        ], 6),
        renderSlot(_ctx.$slots, "btn", {}, void 0, true)
      ], 2);
    };
  }
});
const NInput_vue_vue_type_style_index_0_scoped_a60b1150_lang = "";
const NInput = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-a60b1150"]]);
const _hoisted_1$6 = { class: "nice-row-default" };
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  ...{
    name: "Row"
  },
  __name: "NRow",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$6, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ]);
    };
  }
});
const NRow_vue_vue_type_style_index_0_scoped_0f726b51_lang = "";
const NRow = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-0f726b51"]]);
const _hoisted_1$5 = { class: "nice-col-default" };
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "NCol",
  props: {
    span: {
      type: Number,
      default: 24
    },
    offset: {
      type: Number,
      default: null
    }
  },
  setup(__props) {
    const props = __props;
    useCssVars((_ctx) => ({
      "5c71c4da": width.value,
      "594c6e66": offset.value
    }));
    const width = ref(props.span <= 24 ? props.span % 1 == 0 ? 100 / 24 * props.span + "%" : "" : "");
    const offset = ref(props.offset <= 24 ? props.offset % 1 == 0 ? 100 / 24 * props.offset + "%" : "" : "");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$5, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ]);
    };
  }
});
const NCol_vue_vue_type_style_index_0_scoped_a23fb429_lang = "";
const NCol = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-a23fb429"]]);
const _hoisted_1$4 = { class: "n-checkbox" };
const _hoisted_2$3 = ["onClick"];
const _hoisted_3$3 = { class: "u-label" };
const _hoisted_4$3 = {
  key: 1,
  class: "n-checkbox-wrap"
};
const _hoisted_5$3 = { class: "u-label" };
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "NCheckbox",
  props: {
    options: { default: () => [] },
    disabled: { type: Boolean, default: false },
    vertical: { type: Boolean, default: false },
    value: { default: () => [] },
    gap: { default: 8 },
    indeterminate: { type: Boolean, default: false },
    checked: { type: Boolean, default: false }
  },
  emits: ["update:value", "update:checked", "change"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const sum = computed(() => {
      return props.options.length;
    });
    const checkedValue = ref(props.value);
    watch(
      () => props.value,
      (to) => {
        checkedValue.value = to;
      }
    );
    const styleObject = computed(() => {
      if (props.vertical) {
        return {
          marginBottom: props.gap + "px"
        };
      } else {
        return {
          marginRight: props.gap + "px"
        };
      }
    });
    function onClick(value) {
      if (props.value.includes(value)) {
        const newVal = checkedValue.value.filter((target) => target !== value);
        emits("update:value", newVal);
        emits("change", newVal);
      } else {
        const newVal = [...checkedValue.value, value];
        emits("update:value", newVal);
        emits("change", newVal);
      }
    }
    function onCheckAll() {
      emits("update:checked", !props.checked);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$4, [
        sum.value ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(_ctx.options, (option, index) => {
          return openBlock(), createElementBlock("div", {
            class: normalizeClass(["n-checkbox-wrap", { vertical: _ctx.vertical }]),
            style: normalizeStyle(sum.value !== index + 1 ? styleObject.value : ""),
            key: index
          }, [
            createElementVNode("div", {
              class: normalizeClass(["n-box", { disabled: _ctx.disabled || option.disabled }]),
              onClick: ($event) => _ctx.disabled || option.disabled ? () => false : onClick(option.value)
            }, [
              createElementVNode("span", {
                class: normalizeClass(["u-checkbox", { "u-checkbox-checked": checkedValue.value.includes(option.value) }])
              }, null, 2),
              createElementVNode("span", _hoisted_3$3, [
                renderSlot(_ctx.$slots, "default", {
                  label: option.label
                }, () => [
                  createTextVNode(toDisplayString(option.label), 1)
                ], true)
              ])
            ], 10, _hoisted_2$3)
          ], 6);
        }), 128)) : (openBlock(), createElementBlock("div", _hoisted_4$3, [
          createElementVNode("div", {
            class: normalizeClass(["n-box", { disabled: _ctx.disabled }]),
            onClick: onCheckAll
          }, [
            createElementVNode("span", {
              class: normalizeClass(["u-checkbox", { "u-checkbox-checked": _ctx.checked && !_ctx.indeterminate, indeterminate: _ctx.indeterminate }])
            }, null, 2),
            createElementVNode("span", _hoisted_5$3, [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createTextVNode("Check all")
              ], true)
            ])
          ], 2)
        ]))
      ]);
    };
  }
});
const NCheckbox_vue_vue_type_style_index_0_scoped_2bbb30e0_lang = "";
const NCheckbox = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-2bbb30e0"]]);
const _withScopeId$1 = (n) => (pushScopeId("data-v-4d6b8648"), n = n(), popScopeId(), n);
const _hoisted_1$3 = { class: "n-loading" };
const _hoisted_2$2 = { class: "n-loading-box" };
const _hoisted_3$2 = {
  key: 0,
  class: "n-loading-dot"
};
const _hoisted_4$2 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_5$2 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_6$2 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_7 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_8 = [
  _hoisted_4$2,
  _hoisted_5$2,
  _hoisted_6$2,
  _hoisted_7
];
const _hoisted_9 = {
  key: 1,
  class: "u-spin-circle"
};
const _hoisted_10 = {
  key: 2,
  class: "n-dynamic-circle"
};
const _hoisted_11 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("svg", {
  class: "circular",
  viewBox: "0 0 50 50"
}, [
  /* @__PURE__ */ createElementVNode("circle", {
    class: "path",
    cx: "25",
    cy: "25",
    r: "20",
    fill: "none"
  })
], -1));
const _hoisted_12 = [
  _hoisted_11
];
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "NLoading",
  props: {
    loading: { type: Boolean, default: true },
    size: { default: "default" },
    tip: { default: "" },
    indicator: { default: "dot" },
    color: { default: "#9708cc" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(`n-loading-wrap ${_ctx.size}`),
        style: normalizeStyle(`--color: ${_ctx.color};`)
      }, [
        withDirectives(createElementVNode("div", _hoisted_1$3, [
          createElementVNode("div", _hoisted_2$2, [
            _ctx.indicator === "dot" ? (openBlock(), createElementBlock("div", _hoisted_3$2, _hoisted_8)) : createCommentVNode("", true),
            _ctx.indicator === "static-circle" ? (openBlock(), createElementBlock("div", _hoisted_9)) : createCommentVNode("", true),
            _ctx.indicator === "dynamic-circle" ? (openBlock(), createElementBlock("div", _hoisted_10, _hoisted_12)) : createCommentVNode("", true),
            withDirectives(createElementVNode("p", { class: "u-tip" }, toDisplayString(_ctx.tip), 513), [
              [vShow, _ctx.tip]
            ])
          ])
        ], 512), [
          [vShow, _ctx.loading]
        ]),
        createElementVNode("div", {
          class: normalizeClass(["n-loading-content", { "n-loading-mask": _ctx.loading }])
        }, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 2)
      ], 6);
    };
  }
});
const NLoading_vue_vue_type_style_index_0_scoped_4d6b8648_lang = "";
const NLoading = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-4d6b8648"]]);
const _hoisted_1$2 = { class: "n-switch-wrap" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "NSwitch",
  props: {
    checkedInfo: { default: "" },
    uncheckedInfo: { default: "" },
    disabled: { type: Boolean, default: false },
    checked: { type: Boolean, default: false }
  },
  emits: ["update:checked", "change"],
  setup(__props, { emit }) {
    const props = __props;
    const checked = ref(props.checked);
    watch(
      () => props.checked,
      (to) => {
        checked.value = to;
      }
    );
    function onSwitch() {
      emit("update:checked", !checked.value);
      emit("change", !checked.value);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createElementVNode("div", {
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.disabled ? () => false : onSwitch()),
          class: normalizeClass(["n-switch", { "switch-checked": checked.value, disabled: _ctx.disabled }])
        }, [
          createElementVNode("div", {
            class: normalizeClass(["u-switch-inner", checked.value ? "inner-checked" : "inner-unchecked"])
          }, toDisplayString(checked.value ? _ctx.checkedInfo : _ctx.uncheckedInfo), 3),
          createElementVNode("div", {
            class: normalizeClass(["u-node", { "node-checked": checked.value }])
          }, [
            renderSlot(_ctx.$slots, "node", { checked: checked.value }, void 0, true)
          ], 2)
        ], 2)
      ]);
    };
  }
});
const NSwitch_vue_vue_type_style_index_0_scoped_31d7bda1_lang = "";
const NSwitch = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-31d7bda1"]]);
function rafTimeout(fn, delay = 0, interval = false) {
  const requestAnimationFrame2 = typeof window !== "undefined" ? window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame : () => {
  };
  var start = null;
  function timeElapse(timestamp) {
    if (!start) {
      start = timestamp;
    }
    const elapsed = timestamp - start;
    if (elapsed >= delay) {
      fn();
      if (interval) {
        start = null;
        raf.id = requestAnimationFrame2(timeElapse);
      }
    } else {
      raf.id = requestAnimationFrame2(timeElapse);
    }
  }
  const raf = {
    // 引用类型保存，方便获取 requestAnimationFrame()方法返回的 ID.
    id: requestAnimationFrame2(timeElapse)
  };
  return raf;
}
const _withScopeId = (n) => (pushScopeId("data-v-50ac5309"), n = n(), popScopeId(), n);
const _hoisted_1$1 = { class: "n-collapse" };
const _hoisted_2$1 = ["onClick"];
const _hoisted_3$1 = {
  key: 0,
  focusable: "false",
  class: "u-arrow",
  "data-icon": "right",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
const _hoisted_4$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" }, null, -1));
const _hoisted_5$1 = [
  _hoisted_4$1
];
const _hoisted_6$1 = { class: "u-lang" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "NCollapse",
  props: {
    collapseData: { default: () => [] },
    activeKey: { default: null },
    copyable: { type: Boolean, default: false },
    lang: { default: "" },
    fontSize: { default: 14 },
    headerFontSize: { default: 0 },
    textFontSize: { default: 0 },
    showArrow: { type: Boolean, default: true }
  },
  emits: ["update:activeKey", "change"],
  setup(__props, { emit: emits }) {
    const props = __props;
    watchEffect(
      () => {
        getCollapseHeight(props.collapseData.length);
      },
      { flush: "post" }
    );
    const text = ref();
    const collapseHeight = ref([]);
    function getCollapseHeight(len) {
      for (let n = 0; n < len; n++) {
        collapseHeight.value.push(text.value[n].offsetHeight);
      }
    }
    function dealEmit(value) {
      emits("update:activeKey", value);
      emits("change", value);
    }
    function onClick(key) {
      if (activeJudge(key)) {
        if (Array.isArray(props.activeKey)) {
          const res = props.activeKey.filter((actKey) => actKey !== key);
          dealEmit(res);
        } else {
          dealEmit(null);
        }
      } else {
        if (Array.isArray(props.activeKey)) {
          dealEmit([...props.activeKey, key]);
        } else {
          dealEmit(key);
        }
      }
    }
    function activeJudge(key) {
      if (Array.isArray(props.activeKey)) {
        return props.activeKey.includes(key);
      } else {
        return props.activeKey === key;
      }
    }
    const copyTxt = ref("Copy");
    function onCopy(index) {
      navigator.clipboard.writeText(text.value[index].innerText || "").then(
        () => {
          copyTxt.value = "Copied";
          rafTimeout(() => {
            copyTxt.value = "Copy";
          }, 3e3);
        },
        (err) => {
          copyTxt.value = err;
        }
      );
    }
    return (_ctx, _cache) => {
      const _component_n_button = resolveComponent("n-button");
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.collapseData, (data, index) => {
          return openBlock(), createElementBlock("div", {
            class: normalizeClass(["n-collapse-item", { "u-collapse-item-active": activeJudge(data.key || index) }]),
            key: index
          }, [
            createElementVNode("div", {
              class: "u-collapse-header",
              onClick: ($event) => onClick(data.key || index)
            }, [
              _ctx.showArrow ? (openBlock(), createElementBlock("svg", _hoisted_3$1, _hoisted_5$1)) : createCommentVNode("", true),
              createElementVNode("div", {
                class: normalizeClass(["u-header", { ml24: _ctx.showArrow }]),
                style: normalizeStyle(`font-size: ${_ctx.headerFontSize || _ctx.fontSize}px;`)
              }, [
                renderSlot(_ctx.$slots, "header", {
                  header: data.header,
                  key: data.key || index
                }, () => [
                  createTextVNode(toDisplayString(data.header || "--"), 1)
                ], true)
              ], 6)
            ], 8, _hoisted_2$1),
            createElementVNode("div", {
              class: normalizeClass(["u-collapse-content", { "u-collapse-copyable": _ctx.copyable }]),
              style: normalizeStyle(`height: ${activeJudge(data.key || index) ? collapseHeight.value[index] : 0}px;`)
            }, [
              createElementVNode("div", _hoisted_6$1, [
                renderSlot(_ctx.$slots, "lang", {
                  lang: _ctx.lang,
                  key: data.key || index
                }, () => [
                  createTextVNode(toDisplayString(_ctx.lang), 1)
                ], true)
              ]),
              createVNode(_component_n_button, {
                size: "small",
                class: "u-copy",
                type: "primary",
                onClick: ($event) => onCopy(index)
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(copyTxt.value), 1)
                ]),
                _: 2
              }, 1032, ["onClick"]),
              createElementVNode("div", {
                ref_for: true,
                ref_key: "text",
                ref: text,
                class: "u-text",
                style: normalizeStyle(`font-size: ${_ctx.textFontSize || _ctx.fontSize}px;`)
              }, [
                renderSlot(_ctx.$slots, "text", {
                  text: data.text,
                  key: data.key || index
                }, () => [
                  createTextVNode(toDisplayString(data.text), 1)
                ], true)
              ], 4)
            ], 6)
          ], 2);
        }), 128))
      ]);
    };
  }
});
const NCollapse_vue_vue_type_style_index_0_scoped_50ac5309_lang = "";
const NCollapse = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-50ac5309"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "NDivider",
  props: {
    dashed: { type: Boolean, default: false },
    position: { default: "center" },
    positionMargin: { default: "" },
    borderWidth: { default: 1 }
  },
  setup(__props) {
    const props = __props;
    const text = ref();
    const showText = ref(true);
    const margin = computed(() => {
      if (props.positionMargin !== "") {
        if (typeof props.positionMargin === "number") {
          return props.positionMargin + "px";
        } else {
          return props.positionMargin;
        }
      }
    });
    onMounted(() => {
      if (!text.value.offsetHeight) {
        showText.value = false;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          `n-divider ${_ctx.position}`,
          {
            dashed: _ctx.dashed,
            margin24: !showText.value,
            marginLeft: _ctx.positionMargin !== "" && _ctx.position === "left",
            marginRight: _ctx.positionMargin !== "" && _ctx.position === "right"
          }
        ]),
        style: normalizeStyle(`----border-width:${_ctx.borderWidth}px`)
      }, [
        _ctx.position === "left" ? withDirectives((openBlock(), createElementBlock("span", {
          key: 0,
          class: "u-text",
          style: normalizeStyle(`margin-left: ${margin.value};`),
          ref_key: "text",
          ref: text
        }, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 4)), [
          [vShow, showText.value]
        ]) : _ctx.position === "right" ? withDirectives((openBlock(), createElementBlock("span", {
          key: 1,
          class: "u-text",
          style: normalizeStyle(`margin-right: ${margin.value};`),
          ref_key: "text",
          ref: text
        }, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 4)), [
          [vShow, showText.value]
        ]) : withDirectives((openBlock(), createElementBlock("span", {
          key: 2,
          class: "u-text",
          ref_key: "text",
          ref: text
        }, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 512)), [
          [vShow, showText.value]
        ])
      ], 6);
    };
  }
});
const NDivider_vue_vue_type_style_index_0_scoped_6180190e_lang = "";
const NDivider = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-6180190e"]]);
const _hoisted_1 = { class: "n-empty" };
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<g fill="none" fill-rule="evenodd" data-v-d0028f6b><g transform="translate(24 31.67)" data-v-d0028f6b><ellipse fill-opacity=".8" fill="#F5F5F7" cx="67.797" cy="106.89" rx="67.797" ry="12.668" data-v-d0028f6b></ellipse><path d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z" fill="#AEB8C2" data-v-d0028f6b></path><path d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z" fill="url(#linearGradient-1)" transform="translate(13.56)" data-v-d0028f6b></path><path d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" fill="#F5F5F7" data-v-d0028f6b></path><path d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z" fill="#DCE0E6" data-v-d0028f6b></path></g><path d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z" fill="#DCE0E6" data-v-d0028f6b></path><g transform="translate(149.65 15.383)" fill="#FFF" data-v-d0028f6b><ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" data-v-d0028f6b></ellipse><path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" data-v-d0028f6b></path></g></g>', 1);
const _hoisted_3 = [
  _hoisted_2
];
const _hoisted_4 = /* @__PURE__ */ createStaticVNode('<g transform="translate(0 1)" fill="none" fill-rule="evenodd" data-v-d0028f6b><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7" data-v-d0028f6b></ellipse><g fill-rule="nonzero" stroke="#d9d9d9" data-v-d0028f6b><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" data-v-d0028f6b></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa" data-v-d0028f6b></path></g></g>', 1);
const _hoisted_5 = [
  _hoisted_4
];
const _hoisted_6 = ["src"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "NEmpty",
  props: {
    description: { default: "暂无数据" },
    image: { default: "1" },
    imageStyle: { default: () => {
      return {};
    } }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _ctx.image === "1" ? (openBlock(), createElementBlock("svg", {
          key: 0,
          class: "u-empty-1",
          style: normalizeStyle(_ctx.imageStyle),
          viewBox: "0 0 184 152",
          xmlns: "http://www.w3.org/2000/svg"
        }, _hoisted_3, 4)) : _ctx.image === "2" ? (openBlock(), createElementBlock("svg", {
          key: 1,
          class: "u-empty-2",
          style: normalizeStyle(_ctx.imageStyle),
          viewBox: "0 0 64 41",
          xmlns: "http://www.w3.org/2000/svg"
        }, _hoisted_5, 4)) : renderSlot(_ctx.$slots, "default", { key: 2 }, () => [
          createElementVNode("img", {
            class: "u-empty",
            src: _ctx.image,
            style: normalizeStyle(_ctx.imageStyle),
            alt: "image"
          }, null, 12, _hoisted_6)
        ], true),
        _ctx.description ? (openBlock(), createElementBlock("p", {
          key: 3,
          class: normalizeClass(["u-description", { gray: _ctx.image === "2" }])
        }, [
          renderSlot(_ctx.$slots, "description", {}, () => [
            createTextVNode(toDisplayString(_ctx.description), 1)
          ], true)
        ], 2)) : createCommentVNode("", true)
      ]);
    };
  }
});
const NEmpty_vue_vue_type_style_index_0_scoped_d0028f6b_lang = "";
const NEmpty = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d0028f6b"]]);
const components = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  NButton,
  NCheckbox,
  NCol,
  NCollapse,
  NDivider,
  NEmpty,
  NIcon,
  NInput,
  NLoading,
  NRow,
  NSwitch
}, Symbol.toStringTag, { value: "Module" }));
const install = (Vue) => {
  if (install.installed)
    return;
  const _components = Object.keys(components).map((key) => components[key]);
  _components.forEach((component) => {
    if (component.hasOwnProperty("name") || component.hasOwnProperty("__name")) {
      console.log(component, `${component.__name || component.name}`);
      Vue.component(`${component.__name || component.name}`, component);
    }
  });
};
const NiceUI = {
  install
};
export {
  NButton,
  NCheckbox,
  NCol,
  NCollapse,
  NDivider,
  NEmpty,
  default2 as NIcon,
  NInput,
  NLoading,
  NRow,
  NSwitch,
  NiceUI as default
};
