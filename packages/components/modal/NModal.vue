<template>
  <Transition>
    <div class="n-modal-mask" v-show="visible" @click.self="onBlur">
      <div :class="['n-modal', center ? 'relative-hv-center' : 'top-center']" :style="`width: ${width}px; top: ${!center ? top + 'px' : '50%'};`">
        <n-loading :loading="loading" class="n-modal-body">
          <div class="n-body">
            <div class="n-title">
              <template v-if="mode === 'confirm' || mode === 'erase'">
                <n-icon class="u-icon confirm" type="alert-circle" />
              </template>
              <n-icon type="alert-circle" class="u-icon info" v-if="mode === 'info'" />
              <n-icon type="smile" class="u-icon success" v-if="mode === 'success'" />
              <n-icon type="meh" class="u-icon error" v-if="mode === 'error'" />
              <n-icon type="alert-octagon" class="u-icon warn" v-if="mode === 'warn'" />
              <div class="u-title">{{ desc?.title }}</div>
            </div>
            <div class="u-content">{{ desc?.content }}</div>
          </div>
          <div class="n-btns">
            <template v-if="mode === 'confirm' || mode === 'erase'">
              <n-button @click="onCancel">{{ cancelText }}</n-button>
              <n-button type="primary" @click="onConfirm" v-if="mode === 'confirm'">{{ okText }}</n-button>
              <n-button type="primary" @click="onConfirm" v-if="mode === 'erase'">{{ okText }}</n-button>
            </template>
            <template v-if="['info', 'success', 'error', 'warn'].includes(mode)">
              <n-button type="primary" @click="onKnow">{{ noticeText }}</n-button>
            </template>
          </div>
        </n-loading>
      </div>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import { ref } from 'vue'
interface Desc {
  title: string // 标题
  content: string // 内容
}
interface Props {
  width?: number // 提示框宽度
  cancelText?: string // 取消按钮文字
  okText?: string // 确认按钮文字
  noticeText?: string // 通知按钮文字
  center?: boolean // 水平垂直居中：true  固定高度水平居中：false
  top?: number // 固定高度水平居中时，距顶部高度
  loading?: boolean // 加载中
  visible?: boolean // 提示框是否可见
}
withDefaults(defineProps<Props>(), {
  // 运行时声明
  width: 420,
  cancelText: '取消',
  okText: '确定',
  noticeText: '知道了',
  center: true,
  top: 100,
  loading: false,
  visible: false,
})

// 弹窗类型：'info' 'success' 'error' 'warn' 'confirm' 'erase'
const mode = ref('')
const desc = ref<Desc>()

function info(data: Desc) {
  mode.value = 'info'
  desc.value = data
}
function success(data: Desc) {
  mode.value = 'success'
  desc.value = data
}
function error(data: Desc) {
  mode.value = 'error'
  desc.value = data
}
function warn(data: Desc) {
  mode.value = 'warn'
  desc.value = data
}
function confirm(data: Desc) {
  mode.value = 'confirm'
  desc.value = data
}
function erase(data: Desc) {
  mode.value = 'erase'
  desc.value = data
}
defineExpose({
  info,
  success,
  error,
  warn,
  confirm,
  erase,
})
const emits = defineEmits(['cancel', 'ok', 'know'])
function onBlur() {
  emits('cancel')
}
function onCancel() {
  emits('cancel')
}
function onConfirm() {
  emits('ok')
}
function onKnow() {
  emits('know')
}
</script>
<style lang="less" scoped>
@themeColor: #9708cc;
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.flex-hv-center {
  // 水平垂直居中方法①：弹性布局，随内容增大高度，并自适应水平垂直居中
  display: flex;
  justify-content: center;
  align-items: center;
}
.relative-hv-center {
  // 水平垂直居中方法②：相对定位，随内容增大高度，并自适应水平垂直居中
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.top-center {
  // 相对定位，固定高度，始终距离视图顶端100px
  position: relative;
  // top: 100px;
}
.n-modal-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.45);
  .n-modal {
    width: 420px;
    margin: 0 auto;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 1.571;
    .n-modal-body {
      display: block;
      position: relative;
      word-wrap: break-word;
      padding: 20px 24px;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
      .n-body {
        .n-title {
          width: 100%;
          .u-icon {
            display: inline-block;
            margin-right: 12px;
            margin-top: 1px;
            width: 22px;
            height: 22px;
            font-weight: bold;
            vertical-align: top;
          }
          .confirm {
            color: #faad14;
          }
          .info {
            color: @themeColor;
          }
          .success {
            color: #52c41a;
          }
          .error {
            color: #ff4d4f;
          }
          .warn {
            color: #faad14;
          }
          .u-title {
            display: inline-block;
            vertical-align: top;
            font-size: 16px;
            line-height: 24px;
            font-weight: 600;
            max-width: calc(100% - 34px);
          }
        }
        .u-content {
          margin-left: 34px;
          margin-top: 8px;
          font-size: 14px;
          max-width: calc(100% - 34px);
        }
      }
      .n-btns {
        margin-top: 24px;
        text-align: right;
        div {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
