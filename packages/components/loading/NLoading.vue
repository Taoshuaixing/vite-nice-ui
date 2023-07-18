<script setup lang="ts">
interface Props {
  loading?: boolean // 是否为加载中状态
  size?: 'small' | 'default' | 'large' // 组件大小，可选 small default large
  tip?: string // 描述文案
  indicator?: 'dot' | 'static-circle' | 'dynamic-circle' // 加载指示符
  color?: string // 主题颜色
}
withDefaults(defineProps<Props>(), {
  loading: true,
  size: 'default',
  tip: '',
  indicator: 'dot',
  color: '#9708cc',
})
</script>
<template>
  <div :class="`n-loading-wrap ${size}`" :style="`--color: ${color};`">
    <div class="n-loading" v-show="loading">
      <div class="n-loading-box">
        <div class="n-loading-dot" v-if="indicator === 'dot'">
          <span class="u-dot-item"></span>
          <span class="u-dot-item"></span>
          <span class="u-dot-item"></span>
          <span class="u-dot-item"></span>
        </div>
        <div v-if="indicator === 'static-circle'" class="u-spin-circle"></div>
        <div v-if="indicator === 'dynamic-circle'" class="n-dynamic-circle">
          <svg class="circular" viewBox="0 0 50 50"><circle class="path" cx="25" cy="25" r="20" fill="none"></circle></svg>
        </div>
        <p class="u-tip" v-show="tip">{{ tip }}</p>
      </div>
    </div>
    <div :class="['n-loading-content', { 'n-loading-mask': loading }]">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
.n-loading-wrap {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.n-loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;
  .n-loading-box {
    text-align: center;
    line-height: 0;
    .n-loading-dot {
      position: relative;
      display: inline-block;
      transform: rotate(45deg);
      -ms-transform: rotate(45deg); /* Internet Explorer */
      -moz-transform: rotate(45deg); /* Firefox */
      -webkit-transform: rotate(45deg); /* Safari 和 Chrome */
      -o-transform: rotate(45deg); /* Opera */
      animation: loadingDot 1.2s infinite linear;
      -webkit-animation: loadingDot 1.2s infinite linear;
      @keyframes loadingDot {
        100% {
          transform: rotate(405deg);
        } // to {transform: rotate(405deg);}
      }
      .u-dot-item {
        // 单个圆点样式
        position: absolute;
        background: var(--color);
        border-radius: 50%;
        opacity: 0.3;
        animation: spinMove 1s linear infinite alternate;
        -webkit-animation: spinMove 1s linear infinite alternate;
        @keyframes spinMove {
          100% {
            opacity: 1;
          }
        }
      }
      .u-dot-item:first-child {
        top: 0;
        left: 0;
      }
      .u-dot-item:nth-child(2) {
        top: 0;
        right: 0;
        animation-delay: 0.4s;
        -webkit-animation-delay: 0.4s;
      }
      .u-dot-item:nth-child(3) {
        bottom: 0;
        right: 0;
        animation-delay: 0.8s;
        -webkit-animation-delay: 0.8s;
      }
      .u-dot-item:last-child {
        bottom: 0;
        left: 0;
        animation-delay: 1.2s;
        -webkit-animation-delay: 1.2s;
      }
    }
    .u-spin-circle {
      display: inline-block;
      border-radius: 50%;
      border-style: solid;
      border-color: var(--color);
      border-top-color: transparent; // 隐藏1/4圆
      animation: loadingCircle 1s infinite linear;
      -webkit-animation: loadingCircle 1s infinite linear;
      @keyframes loadingCircle {
        100% {
          transform: rotate(360deg);
        }
      }
    }
    .n-dynamic-circle {
      display: inline-block;
      .circular {
        display: inline;
        animation: loading-rotate 2s linear infinite;
        @keyframes loading-rotate {
          100% {
            transform: rotate(360deg);
          }
        }
        .path {
          stroke-dasharray: 90, 150;
          stroke-dashoffset: 0;
          stroke-width: 5;
          stroke: var(--color);
          stroke-linecap: round;
          animation: loading-dash 1.5s ease-in-out infinite;
          @keyframes loading-dash {
            0% {
              stroke-dasharray: 1, 200;
              stroke-dashoffset: 0;
            }

            50% {
              stroke-dasharray: 90, 150;
              stroke-dashoffset: -40px;
            }
            100% {
              stroke-dasharray: 90, 150;
              stroke-dashoffset: -120px;
            }
          }
        }
      }
    }
    .u-tip {
      color: var(--color);
      text-align: center;
    }
  }
}
.large {
  .n-loading .n-loading-box {
    .n-loading-dot {
      width: 36px;
      height: 36px;
      .u-dot-item {
        width: 12px;
        height: 12px;
      }
    }
    .u-spin-circle {
      width: 40px;
      height: 40px;
      border-width: 4px;
    }
    .n-dynamic-circle {
      width: 42px;
      height: 42px;
    }
    .u-tip {
      font-size: 16px;
      font-weight: 500;
      line-height: 20px;
      margin-top: 14px;
    }
  }
}
.default {
  .n-loading .n-loading-box {
    .n-loading-dot {
      width: 28px;
      height: 28px;
      .u-dot-item {
        width: 10px;
        height: 10px;
      }
    }
    .u-spin-circle {
      width: 32px;
      height: 32px;
      border-width: 3px;
    }
    .n-dynamic-circle {
      width: 34px;
      height: 34px;
    }
    .u-tip {
      font-size: 14px;
      font-weight: 500;
      line-height: 18px;
      margin-top: 10px;
    }
  }
}
.small {
  .n-loading .n-loading-box {
    .n-loading-dot {
      width: 20px;
      height: 20px;
      .u-dot-item {
        width: 8px;
        height: 8px;
      }
    }
    .u-spin-circle {
      width: 24px;
      height: 24px;
      border-width: 2px;
    }
    .n-dynamic-circle {
      width: 26px;
      height: 26px;
    }
    .u-tip {
      font-size: 14px;
      font-weight: 400;
      line-height: 16px;
      margin-top: 6px;
    }
  }
}
.n-loading-content {
  transition: opacity 0.3s;
}
.n-loading-mask {
  user-select: none;
  pointer-events: none;
  opacity: 0.4;
}
</style>
