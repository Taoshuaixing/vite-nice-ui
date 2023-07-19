import { defineComponent, reactive, ref, computed, onMounted, openBlock, createBlock, Transition, withCtx, withDirectives, createElementVNode, normalizeClass, normalizeStyle, unref, createElementBlock, Fragment, createVNode, toDisplayString, renderSlot, vShow, render, withModifiers, createTextVNode, useSlots, createCommentVNode, useCssVars, watch, renderList, pushScopeId, popScopeId, watchEffect, resolveComponent, createStaticVNode, onUnmounted, withKeys, vModelText } from "vue";
import { NIcon } from "vite-nice-ui";
import NIcon$1 from "vue-feather";
import { default as default2 } from "vue-feather";
const _var = "";
function dateFormat(value = Date.now(), format = "YYYY-MM-DD HH:mm:ss") {
  if (typeof value === "number" || typeof value === "string") {
    var date = new Date(value);
  } else {
    var date = value;
  }
  function fixedTwo(value2) {
    return value2 < 10 ? "0" + value2 : String(value2);
  }
  var showTime = format;
  if (showTime.includes("SSS")) {
    const S = date.getMilliseconds();
    showTime = showTime.replace("SSS", "0".repeat(3 - String(S).length) + S);
  }
  if (showTime.includes("YY")) {
    const Y = date.getFullYear();
    showTime = showTime.includes("YYYY") ? showTime.replace("YYYY", String(Y)) : showTime.replace("YY", String(Y).slice(2, 4));
  }
  if (showTime.includes("M")) {
    const M = date.getMonth() + 1;
    showTime = showTime.includes("MM") ? showTime.replace("MM", fixedTwo(M)) : showTime.replace("M", String(M));
  }
  if (showTime.includes("D")) {
    const D = date.getDate();
    showTime = showTime.includes("DD") ? showTime.replace("DD", fixedTwo(D)) : showTime.replace("D", String(D));
  }
  if (showTime.includes("H")) {
    const H = date.getHours();
    showTime = showTime.includes("HH") ? showTime.replace("HH", fixedTwo(H)) : showTime.replace("H", String(H));
  }
  if (showTime.includes("m")) {
    var m = date.getMinutes();
    showTime = showTime.includes("mm") ? showTime.replace("mm", fixedTwo(m)) : showTime.replace("m", String(m));
  }
  if (showTime.includes("s")) {
    var s = date.getSeconds();
    showTime = showTime.includes("ss") ? showTime.replace("ss", fixedTwo(s)) : showTime.replace("s", String(s));
  }
  return showTime;
}
const requestAnimationFrame = typeof window !== "undefined" ? window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame : () => {
};
const cancelAnimationFrame = typeof window !== "undefined" ? window.cancelAnimationFrame || window.mozCancelAnimationFrame : () => {
};
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
function cancelRaf(raf) {
  const cancelAnimationFrame2 = typeof window !== "undefined" ? window.cancelAnimationFrame || window.mozCancelAnimationFrame : () => {
  };
  if (raf && raf.id) {
    cancelAnimationFrame2(raf.id);
  }
}
function throttle(fn, delay = 300) {
  var valid = true;
  return function() {
    if (valid) {
      valid = false;
      rafTimeout(() => {
        fn();
        valid = true;
      }, delay);
    }
    return false;
  };
}
function debounce(fn, delay = 300) {
  let timer = null;
  return function() {
    if (timer) {
      cancelRaf(timer);
    }
    timer = rafTimeout(fn, delay);
  };
}
function add(num1, num2) {
  const num1DeciStr = String(num1).split(".")[1];
  const num2DeciStr = String(num2).split(".")[1];
  let maxLen = Math.max((num1DeciStr == null ? void 0 : num1DeciStr.length) || 0, (num2DeciStr == null ? void 0 : num2DeciStr.length) || 0);
  let num1Str = num1.toFixed(maxLen);
  let num2Str = num2.toFixed(maxLen);
  const result = +num1Str.replace(".", "") + +num2Str.replace(".", "");
  return result / Math.pow(10, maxLen);
}
function downloadFile(url, name) {
  var fileName = "";
  if (name) {
    fileName = name;
  } else {
    const res = url.split("?")[0].split("/");
    fileName = res[res.length - 1];
  }
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "blob";
  xhr.onload = function() {
    if (xhr.status === 200) {
      const blob = xhr.response;
      const link = document.createElement("a");
      const body = document.querySelector("body");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.style.display = "none";
      body == null ? void 0 : body.appendChild(link);
      link.click();
      body == null ? void 0 : body.removeChild(link);
      window.URL.revokeObjectURL(link.href);
    }
  };
  xhr.send();
}
function moneyFormat(value, decimal = 2, split = ",") {
  function thousandFormat(numStr) {
    const len = numStr.length;
    return len <= 3 ? numStr : thousandFormat(numStr.slice(0, len - 3)) + split + numStr.slice(len - 3, len);
  }
  const money = String(value);
  if (isFinite(parseFloat(money))) {
    if (parseFloat(money) === 0) {
      return parseFloat(money).toFixed(decimal);
    } else {
      var res = "";
      var dotIndex = money.indexOf(".");
      if (dotIndex === -1) {
        res = thousandFormat(money) + "." + "0".repeat(decimal);
      } else {
        const numStr = String((Math.round(parseFloat(money) * Math.pow(10, decimal)) / Math.pow(10, decimal)).toFixed(decimal));
        const decimals = numStr.slice(dotIndex, dotIndex + decimal + 1);
        res = thousandFormat(numStr.slice(0, dotIndex)) + decimals;
      }
      return res;
    }
  } else {
    return "--";
  }
}
const _hoisted_1$b = { class: "text" };
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "Message",
  props: {
    text: {
      type: [String, Object],
      default: ""
    },
    type: {
      type: String,
      default: "info"
    },
    icon: String,
    textColor: String,
    bgColor: String,
    customClass: String
  },
  setup(__props) {
    const props = __props;
    const state = reactive({
      style: {
        info: {
          icon: props.icon || "alert-circle",
          color: "#909398",
          backgroundColor: "#F4F4F5",
          borderColor: "#bdbdbd"
        },
        warn: {
          icon: props.icon || "alert-triangle",
          color: "#E6A23B",
          backgroundColor: "#FDF6EC",
          borderColor: "#fad39d"
        },
        error: {
          icon: props.icon || "meh",
          color: "#F56C6B",
          backgroundColor: "#FEEFF0",
          borderColor: "#ffafb4"
        },
        success: {
          icon: props.icon || "smile",
          color: "#67C23A",
          backgroundColor: "#F0F9EB",
          borderColor: "#bbfc95"
        },
        custom: {
          icon: props.icon,
          color: props.textColor,
          backgroundColor: props.bgColor,
          borderColor: props.bgColor
        }
      }
    });
    const isShow = ref(false);
    const { style } = state;
    const isText = computed(() => {
      return typeof props.text === "string";
    });
    onMounted(() => {
      isShow.value = true;
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, { name: "slide-fade" }, {
        default: withCtx(() => [
          withDirectives(createElementVNode("div", {
            class: normalizeClass(["nice-message", __props.customClass]),
            style: normalizeStyle(unref(style)[__props.type])
          }, [
            isText.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createVNode(unref(NIcon), {
                type: unref(style)[__props.type].icon
              }, null, 8, ["type"]),
              createElementVNode("span", _hoisted_1$b, toDisplayString(__props.text), 1)
            ], 64)) : renderSlot(_ctx.$slots, "default", { key: 1 }, void 0, true)
          ], 6), [
            [vShow, isShow.value]
          ])
        ]),
        _: 3
      });
    };
  }
});
const Message_vue_vue_type_style_index_0_scoped_922dd1fa_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const Message = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-922dd1fa"]]);
const NMessage = ({ text, type, timeOut, icon, textColor, bgColor, customClass }) => {
  const div = typeof document !== "undefined" ? typeof document.createElement !== "undefined" ? document.createElement("div") : "" : "";
  div.setAttribute("class", "nice-meassage-container");
  if (typeof document !== "undefined") {
    document.body.appendChild(div);
  }
  let timer = null;
  const vnode = createVNode(Message, { text, type, timeOut, icon, textColor, bgColor, customClass }, [text]);
  render(vnode, div);
  clearTimeout(timer);
  timer = setTimeout(() => {
    render(vnode, div);
    if (typeof document !== "undefined") {
      document.body.removeChild(div);
    }
    clearTimeout(timer);
  }, timeOut || 2500);
};
const _hoisted_1$a = ["href", "target", "disabled"];
const _hoisted_2$6 = { class: "u-spin-circle" };
const _hoisted_3$6 = { class: "u-text" };
const _sfc_main$c = /* @__PURE__ */ defineComponent({
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
            withDirectives(createElementVNode("span", _hoisted_2$6, null, 512), [
              [vShow, _ctx.loading]
            ])
          ], 2), [
            [vShow, !isRoute.value]
          ]),
          createElementVNode("span", _hoisted_3$6, [
            renderSlot(_ctx.$slots, "default", {}, () => [
              createTextVNode(toDisplayString(_ctx.name), 1)
            ], true)
          ])
        ], 14, _hoisted_1$a)
      ], 2);
    };
  }
});
const NButton_vue_vue_type_style_index_0_scoped_0e325af7_lang = "";
const NButton = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-0e325af7"]]);
NIcon$1.name = "NIcon";
const _hoisted_1$9 = ["type", "value", "disabled", "placeholder", "autofocus", "readonly", "form"];
const _sfc_main$b = /* @__PURE__ */ defineComponent({
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
          !_ctx.showPassword && _ctx.leftIcon != "" ? (openBlock(), createBlock(unref(NIcon$1), {
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
          }, null, 40, _hoisted_1$9),
          createVNode(Transition, { name: "slide-fade" }, {
            default: withCtx(() => [
              !_ctx.showPassword && _ctx.clearable && _ctx.modelValue != "" ? (openBlock(), createBlock(unref(NIcon$1), {
                key: 0,
                type: "x",
                class: "clearable-icon",
                onClick: clear
              })) : createCommentVNode("", true)
            ]),
            _: 1
          }),
          !_ctx.showPassword && _ctx.rightIcon != "" ? (openBlock(), createBlock(unref(NIcon$1), {
            key: 1,
            class: normalizeClass(["right-icon"]),
            type: _ctx.rightIcon
          }, null, 8, ["type"])) : createCommentVNode("", true),
          _ctx.showPassword ? (openBlock(), createBlock(unref(NIcon$1), {
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
const NInput = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-a60b1150"]]);
const _hoisted_1$8 = { class: "nice-row-default" };
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  ...{
    name: "Row"
  },
  __name: "NRow",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$8, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ]);
    };
  }
});
const NRow_vue_vue_type_style_index_0_scoped_0f726b51_lang = "";
const NRow = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-0f726b51"]]);
const _hoisted_1$7 = { class: "nice-col-default" };
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
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
      return openBlock(), createElementBlock("div", _hoisted_1$7, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ]);
    };
  }
});
const NCol_vue_vue_type_style_index_0_scoped_a23fb429_lang = "";
const NCol = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-a23fb429"]]);
const _hoisted_1$6 = { class: "n-checkbox" };
const _hoisted_2$5 = ["onClick"];
const _hoisted_3$5 = { class: "u-label" };
const _hoisted_4$5 = {
  key: 1,
  class: "n-checkbox-wrap"
};
const _hoisted_5$5 = { class: "u-label" };
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
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
      return openBlock(), createElementBlock("div", _hoisted_1$6, [
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
              createElementVNode("span", _hoisted_3$5, [
                renderSlot(_ctx.$slots, "default", {
                  label: option.label
                }, () => [
                  createTextVNode(toDisplayString(option.label), 1)
                ], true)
              ])
            ], 10, _hoisted_2$5)
          ], 6);
        }), 128)) : (openBlock(), createElementBlock("div", _hoisted_4$5, [
          createElementVNode("div", {
            class: normalizeClass(["n-box", { disabled: _ctx.disabled }]),
            onClick: onCheckAll
          }, [
            createElementVNode("span", {
              class: normalizeClass(["u-checkbox", { "u-checkbox-checked": _ctx.checked && !_ctx.indeterminate, indeterminate: _ctx.indeterminate }])
            }, null, 2),
            createElementVNode("span", _hoisted_5$5, [
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
const NCheckbox_vue_vue_type_style_index_0_scoped_d795e181_lang = "";
const NCheckbox = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-d795e181"]]);
const _withScopeId$3 = (n) => (pushScopeId("data-v-4d6b8648"), n = n(), popScopeId(), n);
const _hoisted_1$5 = { class: "n-loading" };
const _hoisted_2$4 = { class: "n-loading-box" };
const _hoisted_3$4 = {
  key: 0,
  class: "n-loading-dot"
};
const _hoisted_4$4 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_5$4 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_6$4 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_7$1 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createElementVNode("span", { class: "u-dot-item" }, null, -1));
const _hoisted_8$1 = [
  _hoisted_4$4,
  _hoisted_5$4,
  _hoisted_6$4,
  _hoisted_7$1
];
const _hoisted_9$1 = {
  key: 1,
  class: "u-spin-circle"
};
const _hoisted_10$1 = {
  key: 2,
  class: "n-dynamic-circle"
};
const _hoisted_11$1 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createElementVNode("svg", {
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
const _hoisted_12$1 = [
  _hoisted_11$1
];
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
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
        withDirectives(createElementVNode("div", _hoisted_1$5, [
          createElementVNode("div", _hoisted_2$4, [
            _ctx.indicator === "dot" ? (openBlock(), createElementBlock("div", _hoisted_3$4, _hoisted_8$1)) : createCommentVNode("", true),
            _ctx.indicator === "static-circle" ? (openBlock(), createElementBlock("div", _hoisted_9$1)) : createCommentVNode("", true),
            _ctx.indicator === "dynamic-circle" ? (openBlock(), createElementBlock("div", _hoisted_10$1, _hoisted_12$1)) : createCommentVNode("", true),
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
const NLoading = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-4d6b8648"]]);
const _hoisted_1$4 = { class: "n-switch-wrap" };
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
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
      return openBlock(), createElementBlock("div", _hoisted_1$4, [
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
const NSwitch_vue_vue_type_style_index_0_scoped_52857184_lang = "";
const NSwitch = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-52857184"]]);
const _withScopeId$2 = (n) => (pushScopeId("data-v-65bb8df3"), n = n(), popScopeId(), n);
const _hoisted_1$3 = { class: "n-collapse" };
const _hoisted_2$3 = ["onClick"];
const _hoisted_3$3 = {
  key: 0,
  focusable: "false",
  class: "u-arrow",
  "data-icon": "right",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
};
const _hoisted_4$3 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" }, null, -1));
const _hoisted_5$3 = [
  _hoisted_4$3
];
const _hoisted_6$3 = { class: "u-lang" };
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
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
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.collapseData, (data, index) => {
          return openBlock(), createElementBlock("div", {
            class: normalizeClass(["n-collapse-item", { "u-collapse-item-active": activeJudge(data.key || index) }]),
            key: index
          }, [
            createElementVNode("div", {
              class: "u-collapse-header",
              onClick: ($event) => onClick(data.key || index)
            }, [
              _ctx.showArrow ? (openBlock(), createElementBlock("svg", _hoisted_3$3, _hoisted_5$3)) : createCommentVNode("", true),
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
            ], 8, _hoisted_2$3),
            createElementVNode("div", {
              class: normalizeClass(["u-collapse-content", { "u-collapse-copyable": _ctx.copyable }]),
              style: normalizeStyle(`height: ${activeJudge(data.key || index) ? collapseHeight.value[index] : 0}px;`)
            }, [
              createElementVNode("div", _hoisted_6$3, [
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
const NCollapse_vue_vue_type_style_index_0_scoped_65bb8df3_lang = "";
const NCollapse = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-65bb8df3"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
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
const NDivider = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-6180190e"]]);
const _hoisted_1$2 = { class: "n-empty" };
const _hoisted_2$2 = /* @__PURE__ */ createStaticVNode('<g fill="none" fill-rule="evenodd" data-v-d0028f6b><g transform="translate(24 31.67)" data-v-d0028f6b><ellipse fill-opacity=".8" fill="#F5F5F7" cx="67.797" cy="106.89" rx="67.797" ry="12.668" data-v-d0028f6b></ellipse><path d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z" fill="#AEB8C2" data-v-d0028f6b></path><path d="M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z" fill="url(#linearGradient-1)" transform="translate(13.56)" data-v-d0028f6b></path><path d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z" fill="#F5F5F7" data-v-d0028f6b></path><path d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z" fill="#DCE0E6" data-v-d0028f6b></path></g><path d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z" fill="#DCE0E6" data-v-d0028f6b></path><g transform="translate(149.65 15.383)" fill="#FFF" data-v-d0028f6b><ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" data-v-d0028f6b></ellipse><path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" data-v-d0028f6b></path></g></g>', 1);
const _hoisted_3$2 = [
  _hoisted_2$2
];
const _hoisted_4$2 = /* @__PURE__ */ createStaticVNode('<g transform="translate(0 1)" fill="none" fill-rule="evenodd" data-v-d0028f6b><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7" data-v-d0028f6b></ellipse><g fill-rule="nonzero" stroke="#d9d9d9" data-v-d0028f6b><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" data-v-d0028f6b></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa" data-v-d0028f6b></path></g></g>', 1);
const _hoisted_5$2 = [
  _hoisted_4$2
];
const _hoisted_6$2 = ["src"];
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
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
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        _ctx.image === "1" ? (openBlock(), createElementBlock("svg", {
          key: 0,
          class: "u-empty-1",
          style: normalizeStyle(_ctx.imageStyle),
          viewBox: "0 0 184 152",
          xmlns: "http://www.w3.org/2000/svg"
        }, _hoisted_3$2, 4)) : _ctx.image === "2" ? (openBlock(), createElementBlock("svg", {
          key: 1,
          class: "u-empty-2",
          style: normalizeStyle(_ctx.imageStyle),
          viewBox: "0 0 64 41",
          xmlns: "http://www.w3.org/2000/svg"
        }, _hoisted_5$2, 4)) : renderSlot(_ctx.$slots, "default", { key: 2 }, () => [
          createElementVNode("img", {
            class: "u-empty",
            src: _ctx.image,
            style: normalizeStyle(_ctx.imageStyle),
            alt: "image"
          }, null, 12, _hoisted_6$2)
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
const NEmpty = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-d0028f6b"]]);
const _withScopeId$1 = (n) => (pushScopeId("data-v-1ed181ee"), n = n(), popScopeId(), n);
const _hoisted_1$1 = { class: "n-image-wrap" };
const _hoisted_2$1 = ["onLoad", "src", "alt"];
const _hoisted_3$1 = ["onClick"];
const _hoisted_4$1 = { class: "n-image-mask-info" };
const _hoisted_5$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("svg", {
  class: "u-eye",
  focusable: "false",
  "data-icon": "eye",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" })
], -1));
const _hoisted_6$1 = { class: "u-pre" };
const _hoisted_7 = { class: "n-preview-mask" };
const _hoisted_8 = ["onClick", "onWheel"];
const _hoisted_9 = { class: "n-preview-body" };
const _hoisted_10 = { class: "n-preview-operations" };
const _hoisted_11 = ["title"];
const _hoisted_12 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("svg", {
  class: "u-icon",
  focusable: "false",
  "data-icon": "close",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" })
], -1));
const _hoisted_13 = [
  _hoisted_12
];
const _hoisted_14 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("svg", {
  class: "u-icon",
  focusable: "false",
  "data-icon": "zoom-in",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z" })
], -1));
const _hoisted_15 = [
  _hoisted_14
];
const _hoisted_16 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("svg", {
  class: "u-icon",
  focusable: "false",
  "data-icon": "zoom-out",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M637 443H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h312c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z" })
], -1));
const _hoisted_17 = [
  _hoisted_16
];
const _hoisted_18 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("svg", {
  class: "u-icon",
  focusable: "false",
  "data-icon": "expand",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M342 88H120c-17.7 0-32 14.3-32 32v224c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V168h174c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zm578 576h-48c-8.8 0-16 7.2-16 16v176H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h222c17.7 0 32-14.3 32-32V680c0-8.8-7.2-16-16-16zM342 856H168V680c0-8.8-7.2-16-16-16h-48c-8.8 0-16 7.2-16 16v224c0 17.7 14.3 32 32 32h222c8.8 0 16-7.2 16-16v-48c0-8.8-7.2-16-16-16zM904 88H682c-8.8 0-16 7.2-16 16v48c0 8.8 7.2 16 16 16h174v176c0 8.8 7.2 16 16 16h48c8.8 0 16-7.2 16-16V120c0-17.7-14.3-32-32-32z" })
], -1));
const _hoisted_19 = [
  _hoisted_18
];
const _hoisted_20 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("svg", {
  class: "u-icon",
  focusable: "false",
  "data-icon": "rotate-right",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M480.5 251.2c13-1.6 25.9-2.4 38.8-2.5v63.9c0 6.5 7.5 10.1 12.6 6.1L660 217.6c4-3.2 4-9.2 0-12.3l-128-101c-5.1-4-12.6-.4-12.6 6.1l-.2 64c-118.6.5-235.8 53.4-314.6 154.2A399.75 399.75 0 00123.5 631h74.9c-.9-5.3-1.7-10.7-2.4-16.1-5.1-42.1-2.1-84.1 8.9-124.8 11.4-42.2 31-81.1 58.1-115.8 27.2-34.7 60.3-63.2 98.4-84.3 37-20.6 76.9-33.6 119.1-38.8z" }),
  /* @__PURE__ */ createElementVNode("path", { d: "M880 418H352c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H396V494h440v326z" })
], -1));
const _hoisted_21 = [
  _hoisted_20
];
const _hoisted_22 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("svg", {
  class: "u-icon",
  focusable: "false",
  "data-icon": "rotate-left",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M672 418H144c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H188V494h440v326z" }),
  /* @__PURE__ */ createElementVNode("path", { d: "M819.3 328.5c-78.8-100.7-196-153.6-314.6-154.2l-.2-64c0-6.5-7.6-10.1-12.6-6.1l-128 101c-4 3.1-3.9 9.1 0 12.3L492 318.6c5.1 4 12.7.4 12.6-6.1v-63.9c12.9.1 25.9.9 38.8 2.5 42.1 5.2 82.1 18.2 119 38.7 38.1 21.2 71.2 49.7 98.4 84.3 27.1 34.7 46.7 73.7 58.1 115.8a325.95 325.95 0 016.5 140.9h74.9c14.8-103.6-11.3-213-81-302.3z" })
], -1));
const _hoisted_23 = [
  _hoisted_22
];
const _hoisted_24 = ["src", "alt", "onLoad"];
const _hoisted_25 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("svg", {
  focusable: "false",
  class: "u-switch",
  "data-icon": "left",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" })
], -1));
const _hoisted_26 = [
  _hoisted_25
];
const _hoisted_27 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("svg", {
  focusable: "false",
  class: "u-switch",
  "data-icon": "right",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" })
], -1));
const _hoisted_28 = [
  _hoisted_27
];
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "NImage",
  props: {
    src: { default: "" },
    name: { default: "" },
    previewMode: { type: Boolean, default: false },
    width: { default: 200 },
    height: { default: 200 },
    fit: { default: "contain" },
    preview: { default: "预览" },
    zoomRatio: { default: 0.1 },
    minZoomScale: { default: 0.1 },
    maxZoomScale: { default: 10 },
    resetOnDbclick: { type: Boolean, default: true },
    loop: { type: Boolean, default: false },
    album: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const imageWidth = computed(() => {
      if (typeof props.width === "number") {
        return props.width + "px";
      } else {
        return props.width;
      }
    });
    const imageHeight = computed(() => {
      if (typeof props.height === "number") {
        return props.height + "px";
      } else {
        return props.height;
      }
    });
    const images = ref([]);
    watchEffect(() => {
      images.value = getImages();
    });
    function getImages() {
      if (Array.isArray(props.src)) {
        return props.src;
      } else {
        return [
          {
            src: props.src,
            name: props.name
          }
        ];
      }
    }
    const imageCount = computed(() => {
      return images.value.length;
    });
    onMounted(() => {
      document.addEventListener("keydown", keyboardSwitch);
    });
    onUnmounted(() => {
      document.removeEventListener("keydown", keyboardSwitch);
    });
    const complete = ref(Array(imageCount.value).fill(false));
    const loaded = ref(Array(imageCount.value).fill(false));
    const previewIndex = ref(0);
    const showPreview = ref(false);
    const rotate = ref(0);
    const scale = ref(1);
    const sourceX = ref(0);
    const sourceY = ref(0);
    const dragX = ref(0);
    const dragY = ref(0);
    function keyboardSwitch(e) {
      e.preventDefault();
      if (showPreview.value && imageCount.value > 1) {
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          onSwitchLeft();
        }
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          onSwitchRight();
        }
      }
    }
    function onComplete(n) {
      complete.value[n] = true;
    }
    function onLoaded(index) {
      loaded.value[index] = true;
    }
    function getImageName(image) {
      if (image) {
        if (image.name) {
          return image.name;
        } else {
          const res = image.src.split("?")[0].split("/");
          return res[res.length - 1];
        }
      }
    }
    function onPreview(n) {
      scale.value = 1;
      rotate.value = 0;
      dragX.value = 0;
      dragY.value = 0;
      showPreview.value = true;
      previewIndex.value = n;
    }
    function add2(num1, num2) {
      const num1DeciStr = String(num1).split(".")[1];
      const num2DeciStr = String(num2).split(".")[1];
      let maxLen = Math.max((num1DeciStr == null ? void 0 : num1DeciStr.length) || 0, (num2DeciStr == null ? void 0 : num2DeciStr.length) || 0);
      let num1Str = num1.toFixed(maxLen);
      let num2Str = num2.toFixed(maxLen);
      const result = +num1Str.replace(".", "") + +num2Str.replace(".", "");
      return result / Math.pow(10, maxLen);
    }
    function onClose() {
      showPreview.value = false;
    }
    function onZoomin() {
      if (scale.value + props.zoomRatio > props.maxZoomScale) {
        scale.value = props.maxZoomScale;
      } else {
        scale.value = add2(scale.value, props.zoomRatio);
      }
    }
    function onZoomout() {
      if (scale.value - props.zoomRatio < props.minZoomScale) {
        scale.value = props.minZoomScale;
      } else {
        scale.value = add2(scale.value, -props.zoomRatio);
      }
    }
    function onResetOrigin() {
      scale.value = 1;
      rotate.value = 0;
      dragX.value = 0;
      dragY.value = 0;
    }
    function onWheel(e) {
      console.log("e", e);
      const scrollZoom = e.deltaY * props.zoomRatio * 0.1;
      if (scale.value === props.minZoomScale && scrollZoom > 0) {
        return;
      }
      if (scale.value === props.maxZoomScale && scrollZoom < 0) {
        return;
      }
      if (scale.value - scrollZoom < props.minZoomScale) {
        scale.value = props.minZoomScale;
      } else if (scale.value - scrollZoom > props.maxZoomScale) {
        scale.value = props.maxZoomScale;
      } else {
        scale.value = add2(scale.value, -scrollZoom);
      }
    }
    function onAnticlockwiseRotate() {
      rotate.value -= 90;
    }
    function onClockwiseRotate() {
      rotate.value += 90;
    }
    function onMouseDown(event) {
      const el = event.target;
      const imageRect = el.getBoundingClientRect();
      const top = imageRect.top;
      const bottom = imageRect.bottom;
      const right = imageRect.right;
      const left = imageRect.left;
      const viewportWidth = document.body.clientWidth;
      const viewportHeight = document.body.clientHeight;
      sourceX.value = event.clientX;
      sourceY.value = event.clientY;
      const sourceDragX = dragX.value;
      const sourceDragY = dragY.value;
      document.onmousemove = (e) => {
        dragX.value = sourceDragX + e.clientX - sourceX.value;
        dragY.value = sourceDragY + e.clientY - sourceY.value;
      };
      document.onmouseup = () => {
        if (dragX.value > sourceDragX + viewportWidth - right) {
          dragX.value = sourceDragX + viewportWidth - right;
        }
        if (dragX.value < sourceDragX - left) {
          dragX.value = sourceDragX - left;
        }
        if (dragY.value > sourceDragY + viewportHeight - bottom) {
          dragY.value = sourceDragY + viewportHeight - bottom;
        }
        if (dragY.value < sourceDragY - top) {
          dragY.value = sourceDragY - top;
        }
        document.onmousemove = null;
      };
    }
    function onSwitchLeft() {
      if (props.loop) {
        previewIndex.value = (previewIndex.value - 1 + imageCount.value) % imageCount.value;
      } else {
        if (previewIndex.value > 0) {
          previewIndex.value--;
        }
      }
      onResetOrigin();
    }
    function onSwitchRight() {
      if (props.loop) {
        previewIndex.value = (previewIndex.value + 1) % imageCount.value;
      } else {
        if (previewIndex.value < imageCount.value - 1) {
          previewIndex.value++;
        }
      }
      onResetOrigin();
    }
    return (_ctx, _cache) => {
      const _component_n_loading = resolveComponent("n-loading");
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(images.value, (image, index) => {
          return withDirectives((openBlock(), createElementBlock("div", {
            class: normalizeClass(["n-image", { "image-hover-mask": complete.value[index] }]),
            style: normalizeStyle(`width: ${imageWidth.value}; height: ${imageHeight.value};`),
            key: index
          }, [
            createVNode(_component_n_loading, {
              loading: !complete.value[index],
              indicator: "dynamic-circle"
            }, {
              default: withCtx(() => [
                createElementVNode("img", {
                  class: "u-image",
                  style: normalizeStyle(`width: calc(${imageWidth.value} - 2px); height: calc(${imageHeight.value} - 2px); object-fit: ${_ctx.fit};`),
                  onLoad: ($event) => onComplete(index),
                  src: image.src,
                  alt: image.name
                }, null, 44, _hoisted_2$1)
              ]),
              _: 2
            }, 1032, ["loading"]),
            _ctx.previewMode ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "n-image-mask",
              onClick: ($event) => onPreview(index)
            }, [
              createElementVNode("div", _hoisted_4$1, [
                _hoisted_5$1,
                createElementVNode("p", _hoisted_6$1, [
                  renderSlot(_ctx.$slots, "preview", {}, () => [
                    createTextVNode(toDisplayString(_ctx.preview), 1)
                  ], true)
                ])
              ])
            ], 8, _hoisted_3$1)) : createCommentVNode("", true)
          ], 6)), [
            [vShow, !_ctx.album || _ctx.album && index === 0]
          ]);
        }), 128)),
        createVNode(Transition, { name: "mask" }, {
          default: withCtx(() => [
            withDirectives(createElementVNode("div", _hoisted_7, null, 512), [
              [vShow, showPreview.value]
            ])
          ]),
          _: 1
        }),
        createVNode(Transition, { name: "preview" }, {
          default: withCtx(() => [
            withDirectives(createElementVNode("div", {
              class: "n-preview-wrap",
              onClick: withModifiers(onClose, ["self"]),
              onWheel: withModifiers(onWheel, ["prevent"])
            }, [
              createElementVNode("div", _hoisted_9, [
                createElementVNode("div", _hoisted_10, [
                  createElementVNode("p", {
                    class: "u-name",
                    title: getImageName(images.value[previewIndex.value])
                  }, toDisplayString(getImageName(images.value[previewIndex.value])), 9, _hoisted_11),
                  withDirectives(createElementVNode("p", { class: "u-preview-progress" }, toDisplayString(previewIndex.value + 1) + " / " + toDisplayString(imageCount.value), 513), [
                    [vShow, Array.isArray(_ctx.src)]
                  ]),
                  createElementVNode("div", {
                    class: "u-preview-operation",
                    title: "关闭",
                    onClick: onClose
                  }, _hoisted_13),
                  createElementVNode("div", {
                    class: normalizeClass(["u-preview-operation", { "u-operation-disabled": scale.value === _ctx.maxZoomScale }]),
                    title: "放大",
                    onClick: onZoomin
                  }, _hoisted_15, 2),
                  createElementVNode("div", {
                    class: normalizeClass(["u-preview-operation", { "u-operation-disabled": scale.value === _ctx.minZoomScale }]),
                    title: "缩小",
                    onClick: onZoomout
                  }, _hoisted_17, 2),
                  createElementVNode("div", {
                    class: "u-preview-operation",
                    title: "还原",
                    onClick: onResetOrigin
                  }, _hoisted_19),
                  createElementVNode("div", {
                    class: "u-preview-operation",
                    title: "向右旋转",
                    onClick: onClockwiseRotate
                  }, _hoisted_21),
                  createElementVNode("div", {
                    class: "u-preview-operation",
                    title: "向左旋转",
                    onClick: onAnticlockwiseRotate
                  }, _hoisted_23)
                ]),
                createElementVNode("div", {
                  class: "n-preview-image",
                  style: normalizeStyle(`transform: translate3d(${dragX.value}px, ${dragY.value}px, 0px);`)
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(images.value, (image, index) => {
                    return withDirectives((openBlock(), createBlock(_component_n_loading, {
                      loading: !loaded.value[index],
                      indicator: "dynamic-circle",
                      key: index
                    }, {
                      default: withCtx(() => [
                        createElementVNode("img", {
                          class: "u-preview-image",
                          style: normalizeStyle(`transform: scale3d(${scale.value}, ${scale.value}, 1) rotate(${rotate.value}deg);`),
                          src: image.src,
                          alt: image.name,
                          onMousedown: _cache[0] || (_cache[0] = withModifiers(($event) => onMouseDown($event), ["prevent"])),
                          onLoad: ($event) => onLoaded(index),
                          onDblclick: _cache[1] || (_cache[1] = ($event) => _ctx.resetOnDbclick ? onResetOrigin() : () => false)
                        }, null, 44, _hoisted_24)
                      ]),
                      _: 2
                    }, 1032, ["loading"])), [
                      [vShow, previewIndex.value === index]
                    ]);
                  }), 128))
                ], 4),
                imageCount.value > 1 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  createElementVNode("div", {
                    class: normalizeClass(["n-switch-left", { "u-switch-disabled": previewIndex.value === 0 && !_ctx.loop }]),
                    onClick: onSwitchLeft
                  }, _hoisted_26, 2),
                  createElementVNode("div", {
                    class: normalizeClass(["n-switch-right", { "u-switch-disabled": previewIndex.value === imageCount.value - 1 && !_ctx.loop }]),
                    onClick: onSwitchRight
                  }, _hoisted_28, 2)
                ], 64)) : createCommentVNode("", true)
              ])
            ], 40, _hoisted_8), [
              [vShow, showPreview.value]
            ])
          ]),
          _: 1
        })
      ]);
    };
  }
});
const NImage_vue_vue_type_style_index_0_scoped_1ed181ee_lang = "";
const NImage = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-1ed181ee"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "NMark",
  props: {
    type: {
      type: String,
      default: "normal"
    },
    round: {
      type: Boolean,
      default: false
    },
    to: {
      type: String,
      default: ""
    },
    bold: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const openTo = (to) => {
      const reg = /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/;
      if (reg.test(to)) {
        window.open(to);
      }
    };
    const getMarkClassName = computed(() => {
      const { type, round } = props;
      const to = !!props.to;
      return object2class("n-mark", { type, round, to });
    });
    const object2class = (prefix, props2) => {
      let className = "";
      for (const [key, value] of Object.entries(props2)) {
        if (typeof value === "boolean" && value) {
          className += ` ${prefix}-${key}`;
        } else if (typeof value === "string") {
          className += ` ${prefix}-${key}-${value}`;
        }
      }
      return className;
    };
    return (_ctx, _cache) => {
      const _component_n_icon = resolveComponent("n-icon");
      return openBlock(), createElementBlock("span", {
        class: normalizeClass(["n-mark", getMarkClassName.value]),
        style: normalizeStyle(__props.bold ? "font-weight:bold" : "font-weight:normal"),
        onClick: _cache[0] || (_cache[0] = ($event) => openTo(__props.to))
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true),
        __props.to ? (openBlock(), createBlock(_component_n_icon, {
          key: 0,
          class: "n-icon",
          type: "external-link",
          size: "13"
        })) : createCommentVNode("", true)
      ], 6);
    };
  }
});
const NMark_vue_vue_type_style_index_0_scoped_47d87094_lang = "";
const NMark = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-47d87094"]]);
const _withScopeId = (n) => (pushScopeId("data-v-7d791723"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "n-input-wrap" };
const _hoisted_2 = { class: "n-handler-wrap" };
const _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("svg", {
  focusable: "false",
  class: "u-icon",
  "data-icon": "up",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z" })
], -1));
const _hoisted_4 = [
  _hoisted_3
];
const _hoisted_5 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("svg", {
  focusable: "false",
  class: "u-icon",
  "data-icon": "down",
  "aria-hidden": "true",
  viewBox: "64 64 896 896"
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" })
], -1));
const _hoisted_6 = [
  _hoisted_5
];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "NInputNumber",
  props: {
    width: { default: 90 },
    min: { default: -Infinity },
    max: { default: Infinity },
    step: { default: 1 },
    precision: { default: 0 },
    prefix: { default: "" },
    formatter: { type: Function, default: (value) => value },
    keyboard: { type: Boolean, default: true },
    value: { default: null }
  },
  emits: ["update:value", "change"],
  setup(__props, { emit: emits }) {
    var _a;
    const props = __props;
    const precision = computed(() => {
      var _a2;
      const stepPrecision = ((_a2 = String(props.step).split(".")[1]) == null ? void 0 : _a2.length) || 0;
      return Math.max(props.precision, stepPrecision);
    });
    const numValue = ref(props.formatter((_a = props.value) == null ? void 0 : _a.toFixed(precision.value)));
    watch(
      () => props.value,
      (to) => {
        numValue.value = props.formatter(to == null ? void 0 : to.toFixed(precision.value));
      }
    );
    watch(numValue, (to) => {
      if (!to) {
        emitValue(null);
      }
    });
    function emitValue(value) {
      emits("change", value);
      emits("update:value", value);
    }
    function onChange(e) {
      var _a2, _b;
      const value = e.target.value.replaceAll(",", "");
      if (!Number.isNaN(parseFloat(value))) {
        if (parseFloat(value) > props.max) {
          emitValue(props.max);
          return;
        }
        if (parseFloat(value) < props.min) {
          emitValue(props.min);
          return;
        }
        if (parseFloat(value) !== props.value) {
          emitValue(parseFloat(value));
        } else {
          numValue.value = (_a2 = props.value) == null ? void 0 : _a2.toFixed(precision.value);
        }
      } else {
        numValue.value = (_b = props.value) == null ? void 0 : _b.toFixed(precision.value);
      }
    }
    function add2(num1, num2) {
      const num1DeciStr = String(num1).split(".")[1];
      const num2DeciStr = String(num2).split(".")[1];
      let maxLen = Math.max((num1DeciStr == null ? void 0 : num1DeciStr.length) || 0, (num2DeciStr == null ? void 0 : num2DeciStr.length) || 0);
      let num1Str = num1.toFixed(maxLen);
      let num2Str = num2.toFixed(maxLen);
      const result = +num1Str.replace(".", "") + +num2Str.replace(".", "");
      return result / Math.pow(10, maxLen);
    }
    function onKeyboard(e) {
      if (e.key === "ArrowUp") {
        onUp();
      }
      if (e.key === "ArrowDown") {
        onDown();
      }
    }
    function onUp() {
      const res = parseFloat(Math.min(props.max, add2(props.value || 0, +props.step)).toFixed(precision.value));
      emitValue(res);
    }
    function onDown() {
      const res = parseFloat(Math.max(props.min, add2(props.value || 0, -props.step)).toFixed(precision.value));
      emitValue(res);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "n-input-number",
        tabindex: "1",
        style: normalizeStyle(`width: ${_ctx.width}px;`)
      }, [
        createElementVNode("div", _hoisted_1, [
          createElementVNode("span", {
            class: normalizeClass(["u-input-prefix", { mr3: _ctx.prefix }])
          }, [
            renderSlot(_ctx.$slots, "prefix", {}, () => [
              createTextVNode(toDisplayString(_ctx.prefix), 1)
            ], true)
          ], 2),
          _ctx.keyboard ? withDirectives((openBlock(), createElementBlock("input", {
            key: 0,
            autocomplete: "off",
            class: "u-input-number",
            onChange,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => numValue.value = $event),
            onKeydown: [
              _cache[1] || (_cache[1] = withKeys(withModifiers(() => {
              }, ["prevent"]), ["up"])),
              onKeyboard
            ]
          }, null, 544)), [
            [vModelText, numValue.value]
          ]) : withDirectives((openBlock(), createElementBlock("input", {
            key: 1,
            autocomplete: "off",
            class: "u-input-number",
            onChange,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => numValue.value = $event)
          }, null, 544)), [
            [vModelText, numValue.value]
          ])
        ]),
        createElementVNode("div", _hoisted_2, [
          createElementVNode("span", {
            class: normalizeClass(["u-up-arrow", { disabled: (_ctx.value || 0) >= _ctx.max }]),
            onClick: onUp
          }, _hoisted_4, 2),
          createElementVNode("span", {
            class: normalizeClass(["u-down-arrow", { disabled: (_ctx.value || 0) <= _ctx.min }]),
            onClick: onDown
          }, _hoisted_6, 2)
        ])
      ], 4);
    };
  }
});
const NInputNumber_vue_vue_type_style_index_0_scoped_7d791723_lang = "";
const NInputNumber = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7d791723"]]);
const components = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  NButton,
  NCheckbox,
  NCol,
  NCollapse,
  NDivider,
  NEmpty,
  NIcon: NIcon$1,
  NImage,
  NInput,
  NInputNumber,
  NLoading,
  NMark,
  NRow,
  NSwitch
}, Symbol.toStringTag, { value: "Module" }));
const install = (Vue) => {
  if (install.installed)
    return;
  const _components = Object.keys(components).map((key) => components[key]);
  _components.forEach((component) => {
    if (component.hasOwnProperty("name") || component.hasOwnProperty("__name")) {
      console.log(component);
      Vue.component(`${component.__name || component.name}`, component);
    }
  });
};
export {
  NButton,
  NCheckbox,
  NCol,
  NCollapse,
  NDivider,
  NEmpty,
  default2 as NIcon,
  NImage,
  NInput,
  NInputNumber,
  NLoading,
  NMark,
  NMessage,
  NRow,
  NSwitch,
  add,
  cancelAnimationFrame,
  cancelRaf,
  dateFormat,
  debounce,
  install as default,
  downloadFile,
  moneyFormat,
  rafTimeout,
  requestAnimationFrame,
  throttle
};
