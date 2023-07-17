import { defineComponent, computed, openBlock, createElementBlock, normalizeClass, createElementVNode, withModifiers, normalizeStyle, withDirectives, vShow, renderSlot, createTextVNode, toDisplayString, useSlots, ref, createBlock, unref, createCommentVNode, createVNode, Transition, withCtx, useCssVars, watch, Fragment, renderList } from "vue";
import Icon from "vue-feather";
import { default as default2 } from "vue-feather";
const _hoisted_1$4 = ["href", "target", "disabled"];
const _hoisted_2$1 = { class: "u-spin-circle" };
const _hoisted_3$1 = { class: "u-text" };
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Button",
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
        Object.keys(query).forEach((param, index2) => {
          if (index2 === 0) {
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
            withDirectives(createElementVNode("span", _hoisted_2$1, null, 512), [
              [vShow, _ctx.loading]
            ])
          ], 2), [
            [vShow, !isRoute.value]
          ]),
          createElementVNode("span", _hoisted_3$1, [
            renderSlot(_ctx.$slots, "default", {}, () => [
              createTextVNode(toDisplayString(_ctx.name), 1)
            ], true)
          ])
        ], 14, _hoisted_1$4)
      ], 2);
    };
  }
});
const Button_vue_vue_type_style_index_0_scoped_cf35ad80_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const Button = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-cf35ad80"]]);
Icon.name = "Icon";
const _hoisted_1$3 = ["type", "value", "disabled", "placeholder", "autofocus", "readonly", "form"];
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Input",
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
          !_ctx.showPassword && _ctx.leftIcon != "" ? (openBlock(), createBlock(unref(Icon), {
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
          }, null, 40, _hoisted_1$3),
          createVNode(Transition, { name: "slide-fade" }, {
            default: withCtx(() => [
              !_ctx.showPassword && _ctx.clearable && _ctx.modelValue != "" ? (openBlock(), createBlock(unref(Icon), {
                key: 0,
                type: "x",
                class: "clearable-icon",
                onClick: clear
              })) : createCommentVNode("", true)
            ]),
            _: 1
          }),
          !_ctx.showPassword && _ctx.rightIcon != "" ? (openBlock(), createBlock(unref(Icon), {
            key: 1,
            class: normalizeClass(["right-icon"]),
            type: _ctx.rightIcon
          }, null, 8, ["type"])) : createCommentVNode("", true),
          _ctx.showPassword ? (openBlock(), createBlock(unref(Icon), {
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
const Input_vue_vue_type_style_index_0_scoped_37800659_lang = "";
const Input = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-37800659"]]);
const _hoisted_1$2 = { class: "nice-row-default" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...{
    name: "Row"
  },
  __name: "Row",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ]);
    };
  }
});
const Row_vue_vue_type_style_index_0_scoped_2fa79525_lang = "";
const Row = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-2fa79525"]]);
const _hoisted_1$1 = { class: "nice-col-default" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Col",
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
      "7496e1f6": width.value,
      "10753663": offset.value
    }));
    const width = ref(props.span <= 24 ? props.span % 1 == 0 ? 100 / 24 * props.span + "%" : "" : "");
    const offset = ref(props.offset <= 24 ? props.offset % 1 == 0 ? 100 / 24 * props.offset + "%" : "" : "");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ]);
    };
  }
});
const Col_vue_vue_type_style_index_0_scoped_4c1791c0_lang = "";
const Col = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-4c1791c0"]]);
const _hoisted_1 = { class: "n-checkbox" };
const _hoisted_2 = ["onClick"];
const _hoisted_3 = { class: "u-label" };
const _hoisted_4 = {
  key: 1,
  class: "n-checkbox-wrap"
};
const _hoisted_5 = { class: "u-label" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Checkbox",
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
      return openBlock(), createElementBlock("div", _hoisted_1, [
        sum.value ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(_ctx.options, (option, index2) => {
          return openBlock(), createElementBlock("div", {
            class: normalizeClass(["n-checkbox-wrap", { vertical: _ctx.vertical }]),
            style: normalizeStyle(sum.value !== index2 + 1 ? styleObject.value : ""),
            key: index2
          }, [
            createElementVNode("div", {
              class: normalizeClass(["n-box", { disabled: _ctx.disabled || option.disabled }]),
              onClick: ($event) => _ctx.disabled || option.disabled ? () => false : onClick(option.value)
            }, [
              createElementVNode("span", {
                class: normalizeClass(["u-checkbox", { "u-checkbox-checked": checkedValue.value.includes(option.value) }])
              }, null, 2),
              createElementVNode("span", _hoisted_3, [
                renderSlot(_ctx.$slots, "default", {
                  label: option.label
                }, () => [
                  createTextVNode(toDisplayString(option.label), 1)
                ], true)
              ])
            ], 10, _hoisted_2)
          ], 6);
        }), 128)) : (openBlock(), createElementBlock("div", _hoisted_4, [
          createElementVNode("div", {
            class: normalizeClass(["n-box", { disabled: _ctx.disabled }]),
            onClick: onCheckAll
          }, [
            createElementVNode("span", {
              class: normalizeClass(["u-checkbox", { "u-checkbox-checked": _ctx.checked && !_ctx.indeterminate, indeterminate: _ctx.indeterminate }])
            }, null, 2),
            createElementVNode("span", _hoisted_5, [
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
const Checkbox_vue_vue_type_style_index_0_scoped_7c7fb0f7_lang = "";
const Checkbox = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7c7fb0f7"]]);
const components = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button,
  Checkbox,
  Col,
  Icon,
  Input,
  Row
}, Symbol.toStringTag, { value: "Module" }));
const install = function(Vue) {
  if (install.installed)
    return;
  const _components = Object.keys(components).map((key) => components[key]);
  _components.forEach((component) => {
    if (component.hasOwnProperty("name") || component.hasOwnProperty("__name")) {
      Vue.component(`N${component.name || component.__name}`, component);
    }
  });
};
const index = {
  install
};
export {
  Button,
  Checkbox,
  Col,
  default2 as Icon,
  Input,
  Row,
  index as default
};
