<template>
  <div :class="[`nice-group-input-${size}`]" :style="{ 'min-width': 'auto' }">
    <div :class="isClass" :style="isStyle" style="">
      <i :class="['left-icon', 'iconfont', leftIcon]" v-if="!showPassword && leftIcon != ''"></i>
      <input
        :type="inptype"
        @focus="focus"
        @blur="blur"
        :value="modelValue"
        @input="iptChange"
        :disabled="disabled"
        @change="change"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :readonly="readonly"
        :form="form"
      />
      <transition name="slide-fade">
        <i class="clearable-icon iconfont m-icon-close" v-if="!showPassword && clearable && modelValue != ''" @click="clear"></i>
      </transition>

      <i :class="['right-icon', 'iconfont', rightIcon]" v-if="!showPassword && rightIcon != ''"></i>
      <i v-if="showPassword" :class="['password-icon', 'iconfont m-icon-browse']" @click="showPwd(type)"></i>
    </div>
    <slot name="btn" />
  </div>
</template>
<script setup lang="ts">
import { ref, computed, useSlots } from 'vue'
interface Props {
  modelValue?: string | number
  disabled?: boolean
  clearable?: boolean
  showPassword?: boolean
  type?: string
  size?: 'small' | 'large' | 'default' // 尺寸
  leftIcon?: string
  rightIcon?: string
  placeholder?: string
  //当页面加载时 <input> 元素自动获得焦点
  autofocus?: boolean
  focusColor?: string
  readonly?: boolean
  form?: string
}
const emit = defineEmits(['update:modelValue', 'clear', 'focus', 'blur', 'input', 'change'])
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  disabled: false,
  clearable: false,
  showPassword: false,
  type: '',
  size: 'default',
  leftIcon: '',
  rightIcon: '',
  placeholder: '',
  autofocus: false,
  focusColor: '#9708cc',
  readonly: false,
  form: '',
})
const slot = useSlots()
const isStyle = ref({})
const inptype = ref(props.type)
let focusStyle = {
  width: !!slot.btn ? 'auto' : '100%',
  float: !!slot.btn ? 'left' : 'auto',
  'border-radius': !!slot.btn ? '4px 0 0 4px' : '4px',
  'border-color': '#dcdfe6f6',
}
isStyle.value = focusStyle
const focus = (e: any) => {
  focusStyle['border-color'] = '#9708CC'
  isStyle.value = {
    width: !!slot.btn ? 'auto' : '100%',
    float: !!slot.btn ? 'left' : 'auto',
    'border-radius': !!slot.btn ? '4px 0 0 4px' : '4px',
    'border-color': props.focusColor,
  }
  emit('focus', e)
}
const blur = (e: any) => {
  isStyle.value = {
    width: !!slot.btn ? 'auto' : '100%',
    float: !!slot.btn ? 'left' : 'auto',
    'border-radius': !!slot.btn ? '4px 0 0 4px' : '4px',
  }
  emit('blur', e)
}
const iptChange = (e: any) => {
  emit('update:modelValue', e.target.value)
  emit('input', e.target.value)
}
const change = (e: any) => {
  emit('change', e)
}
const clear = () => {
  emit('update:modelValue', '')
  emit('clear')
}
// 显示密码
const showPwd = (e: any) => {
  if (inptype.value == 'text') {
    inptype.value = 'password'
  } else {
    inptype.value = 'text'
  }

  console.log(e)
}
const isClass = computed(() => {
  return [
    props.clearable ? 'nice-input-clearable' : props.size == 'default' ? 'nice-input-default' : `nice-input-${props.size}`,
    props.leftIcon != '' ? `nice-input-left-icon-${props.size}` : !props.clearable ? (props.rightIcon != '' ? `nice-input-right-icon-${props.size}` : '') : '',
    props.disabled ? 'nice-input-disabled' : '',
    props.type == 'password' ? (props.showPassword ? `nice-input-password-showpassword-${props.size}` : `nice-input-password-${props.size}`) : '',
  ]
})
</script>
<style scoped lang="less">
.nice-input-default,
.nice-input-password-default,
.nice-input-password-showpassword-default,
.nice-group-input-default {
  width: 100%;
  height: 35px;
  border: 1px solid #dcdfe6f6;
  overflow: hidden;
  border-radius: 4px;
  transition: all 0.2s ease;
  position: relative;
  box-sizing: border-box;

  input {
    width: 100%;
    height: 35px;
    font-size: 14px;
    outline: none;
    border: 0;
    margin: 0;
    padding: 10px 10px 10px 10px;
    box-sizing: border-box;
    color: #606266;
  }

  input::placeholder {
    /* 大部分现代浏览器 */
    color: #c6c8cc;
    font-size: 14px;
  }

  i.password-icon {
    position: absolute;
    right: 10px;
    top: 11px;
    color: #94969b;
    transition: all 0.2s ease;
    cursor: pointer;
  }
}

.nice-input-password-showpassword-default {
  input {
    padding-right: 30px;
  }
}

.nice-input-clearable {
  width: 100%;
  height: 35px;
  border: 1px solid #dcdfe6f6;
  overflow: hidden;
  border-radius: 4px;
  transition: all 0.2s ease;
  position: relative;
  box-sizing: border-box;

  input {
    width: 100%;
    font-size: 14px;
    outline: none;
    border: 0;
    margin: 0;
    padding: 10px 30px 10px 10px;
    box-sizing: border-box;
    color: #606266;
  }

  input::placeholder {
    /* 大部分现代浏览器 */
    color: #c6c8cc;
    font-size: 14px;
  }

  .clearable-icon {
    position: absolute;
    right: 10px;
    top: 10px;
    color: #94969b;
    transition: all 0.2s ease;
    cursor: pointer;
  }
}

.nice-input-small,
.nice-input-password-small,
.nice-input-password-showpassword-small,
.nice-group-input-small {
  width: 100%;
  height: 30px;
  border: 1px solid #dcdfe6f6;
  overflow: hidden;
  border-radius: 4px;
  transition: all 0.2s ease;
  position: relative;
  box-sizing: border-box;

  input {
    width: 100%;
    height: 30px;
    font-size: 13px;
    outline: none;
    border: 0;
    margin: 0;
    padding: 7px 30px 7px 10px;
    box-sizing: border-box;
    color: #606266;
  }

  input::placeholder {
    /* 大部分现代浏览器 */
    color: #c6c8cc;
    font-size: 13px;
  }

  i.password-icon {
    position: absolute;
    right: 10px;
    top: 8px;
    color: #94969b;
    transition: all 0.2s ease;
    cursor: pointer;
  }
}

.nice-input-password-showpassword-small {
  input {
    padding-right: 30px;
  }
}

.nice-input-large,
.nice-input-password-large,
.nice-input-password-showpassword-large,
.nice-group-input-large {
  width: 100%;
  height: 45px;
  border: 1px solid #dcdfe6f6;
  overflow: hidden;
  border-radius: 4px;
  transition: all 0.2s ease;
  position: relative;
  box-sizing: border-box;

  input {
    width: 100%;
    font-size: 15px;
    height: 45px;
    outline: none;
    border: 0;
    margin: 0;
    padding: 6px 10px 6px 10px;
    box-sizing: border-box;
    color: #606266;
  }

  input::placeholder {
    /* 大部分现代浏览器 */
    color: #c6c8cc;
    font-size: 15px;
  }

  i.password-icon {
    position: absolute;
    right: 10px;
    top: 7px;
    color: #94969b;
    transition: all 0.2s ease;
    cursor: pointer;
  }
}

.nice-input-password-showpassword-large {
  input {
    padding-right: 30px;
  }
}

.nice-input-left-icon-default {
  height: 35px;

  input {
    padding: 10px 25px 10px 32px;
  }

  input::placeholder {
    /* 大部分现代浏览器 */
    color: #c6c8cc;
    font-size: 14px;
  }

  .left-icon {
    position: absolute;
    left: 10px;
    top: 11px;
    color: #94969b;
  }
}

.nice-input-left-icon-small {
  height: 30px;

  input {
    padding: 7px 25px 7px 32px;
    font-size: 13px;
  }

  input::placeholder {
    /* 大部分现代浏览器 */
    color: #c6c8cc;
    font-size: 13px;
  }

  .left-icon {
    position: absolute;
    left: 10px;
    top: 8px;
    font-size: 13px;
    color: #94969b;
  }

  .clearable-icon {
    font-size: 13px;
    top: 8px;
  }
}

.nice-input-left-icon-large {
  height: 45px;

  input {
    padding: 6px 25px 6px 32px;
    font-size: 12px;
  }

  input::placeholder {
    /* 大部分现代浏览器 */
    color: #c6c8cc;
    font-size: 12px;
  }

  .left-icon {
    position: absolute;
    left: 10px;
    top: 7px;
    font-size: 12px;
    color: #94969b;
  }

  .clearable-icon {
    font-size: 12px;
    top: 7px;
  }
}

.nice-input-right-icon-default {
  height: 35px;

  input {
    padding: 10px 32px 10px 10px;
  }

  input::placeholder {
    /* 大部分现代浏览器 */
    color: #c6c8cc;
  }

  .right-icon {
    position: absolute;
    right: 10px;
    top: 11px;
    color: #94969b;
  }
}

.nice-input-right-icon-small {
  height: 30px;

  input {
    padding: 7px 32px 7px 10px;
    font-size: 13px;
  }

  input::placeholder {
    /* 大部分现代浏览器 */
    color: #c6c8cc;
    font-size: 13px;
  }

  .right-icon {
    position: absolute;
    right: 10px;
    top: 8px;
    font-size: 13px;
    color: #94969b;
  }
}

.nice-input-right-icon-large {
  height: 45px;

  input {
    padding: 6px 32px 6px 10px;
    font-size: 12px;
  }

  input::placeholder {
    /* 大部分现代浏览器 */
    color: #c6c8cc;
    font-size: 12px;
  }

  .right-icon {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 12px;
    color: #94969b;
  }
}

.nice-input-disabled {
  input {
    cursor: no-drop;
    color: #c3bfbf;
  }

  .clearable-icon {
    display: none;
  }

  .left-icon {
    position: absolute;
    left: 10px;
    top: 10px;
    color: #c6c8cc;
  }

  .right-icon {
    position: absolute;
    right: 10px;
    top: 10px;
    color: #c6c8cc;
  }
}

.nice-group-input-default {
  border: none;
  height: auto;
}

.nice-group-input-small {
  border: none;
  height: auto;

  .nice-input-clearable {
    height: 30px;

    .clearable-icon {
      top: 7px;
      font-size: 13px;
    }
  }
}

.nice-group-input-large {
  border: none;

  .nice-input-clearable {
    height: 45px;

    .clearable-icon {
      top: 8px;
      font-size: 12px;
    }
  }
}

.nice-group-input-default :deep(.nice-button) {
  padding: 9px 20px !important;
  border-radius: 0 2px 2px 0;
}

.nice-group-input-small :deep(.nice-button) {
  padding: 6.6px 15px !important;
  border-radius: 0 2px 2px 0;
}

.nice-group-input-large :deep(.nice-button) {
  padding: 7px 15px !important;
  font-size: 12px;
  border-radius: 0 2px 2px 0;

  i {
    font-size: 12px;
  }
}

input::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: #c6c8cc;
}

input:-moz-placeholder {
  /* Mozilla Firefox 4 ~ 18 */
  color: #c6c8cc;
}

input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #c6c8cc;
}

input:-ms-input-placeholder {
  /* Internet Explorer 10 ~ 11 */
  color: #c6c8cc;
}

input::-ms-input-placeholder {
  /* Microsoft Edge */
  color: #c6c8cc;
}

.slide-fade-enter-active {
  transition: all 0.1s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
