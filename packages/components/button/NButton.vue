<template>
  <div :class="['n-btn-wrap', { center: center }]">
    <a
      @click.stop="isRoute ? () => false : $emit('click', $event)"
      :href="getUrl(route)"
      :target="isRoute ? target : '_self'"
      :disabled="disabled"
      class="n-btn"
      :class="[type, size, { [effect]: type === 'default', widthType: width, disabled: disabled, 'n-btn-loading': !isRoute && loading }]"
      :style="`border-radius: ${borderRadius}px; width: ${width ? width + 'px' : 'auto'}; height: ${height ? height + 'px' : 'auto'}; line-height: ${height - 2}px;`"
    >
      <span v-show="!isRoute" class="n-loading-icon" :class="{ 'show-spin': loading }">
        <span class="u-spin-circle" v-show="loading"></span>
      </span>
      <span class="u-text">
        <slot>{{ name }}</slot>
      </span>
    </a>
  </div>
</template>
<script setup lang="ts">
// 这里至少有一行注释，否则插件不生效
import { computed } from 'vue'
interface Query {
  [propName: string]: any // 添加一个字符串索引签名，用于包含带有任意数量的其他属性
}
interface Route {
  path?: string // 路由地址
  query?: Query // 路由查询参数
}
interface Props {
  name?: string // 默认文本 string | slot
  type?: 'default' | 'primary' | 'danger' // 类型
  effect?: 'fade' | 'reverse' // 悬浮变化效果，只有 type 为 default 时，effect 才生效
  size?: 'small' | 'middle' | 'large' // 尺寸
  width?: number // 宽度
  height?: number // 高度
  borderRadius?: number // 圆角
  route?: Route // 跳转目标URL地址
  target?: '_self' | '_blank' // 如何打开目标URL，设置route时才起作用，与a标签的target属性一致
  disabled?: boolean // 是否禁用
  loading?: boolean // 是否加载中
  center?: boolean // 是否将按钮设置为块级元素并居中展示
}
const props = withDefaults(defineProps<Props>(), {
  name: '',
  type: 'default',
  effect: 'fade',
  size: 'middle',
  width: 0, // 优先级高于size属性，为0时自适应内容的宽度
  height: 0, // 优先级高于size属性
  borderRadius: 5,
  route: () => {
    return {}
  },
  target: '_self',
  disabled: false,
  loading: false,
  center: false,
})
const isRoute = computed(() => {
  if (JSON.stringify(props.route) === '{}') {
    return false
  } else {
    return true
  }
})
function getUrl(route: Route) {
  var targetUrl = route.path
  if (route.query && JSON.stringify(route.query) !== '{}') {
    const query = route.query
    Object.keys(query).forEach((param, index) => {
      if (index === 0) {
        targetUrl = targetUrl + '?' + param + '=' + query[param]
      } else {
        targetUrl = targetUrl + '&' + param + '=' + query[param]
      }
    })
  }
  return targetUrl
}
</script>
<style lang="less" scoped>
@primary: #9708cc;
@danger: #ff4d4f;

.n-btn-wrap {
  display: inline-block;

  .n-btn {
    display: inline-block;
    color: rgba(0, 0, 0, 0.88);
    background-color: #ffffff;
    border: 1px solid #d9d9d9;
    box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;

    &:active {
      transform: scale(0.96);
    }

    .n-loading-icon {
      display: inline-flex;
      align-items: center;
      text-align: left;
      opacity: 0;
      width: 0;
      transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

      .u-spin-circle {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border-width: 1px;
        border-style: solid;
        border-color: transparent;
        border-top-color: inherit; // 显示1/4圆
        animation: loadingCircle 1s infinite linear;
        -webkit-animation: loadingCircle 1s infinite linear;
      }

      @keyframes loadingCircle {
        100% {
          transform: rotate(360deg);
        }
      }
    }

    .show-spin {
      width: 22px;
      opacity: 1;
    }

    .u-text {
      display: inline-flex;
      align-items: center;
      height: 100%;
    }
  }

  .n-btn-loading {
    opacity: 0.65;
    pointer-events: none;
  }

  .primary {
    color: #fff;
    background-color: @primary;
    border-color: @primary;
    text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    box-shadow: 0 2px 0 rgb(0 0 0 / 5%);

    &:hover {
      background-color: fade(@primary, 80%);
      border-color: fade(@primary, 80%);
    }

    &:active {
      background-color: shade(@primary, 12%);
      border-color: shade(@primary, 12%);
    }
  }

  .default {
    .fade();
  }

  .danger {
    color: #fff;
    background-color: @danger;
    border-color: @danger;
    text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    box-shadow: 0 2px 0 rgb(0 0 0 / 5%);

    &:hover {
      background-color: fade(@danger, 80%);
      border-color: fade(@danger, 80%);
    }

    &:active {
      background-color: shade(@danger, 12%);
      border-color: shade(@danger, 12%);
    }
  }

  .fade {
    &:hover {
      color: fade(@primary, 80%);
      border-color: fade(@primary, 80%);
    }

    &:active {
      color: shade(@primary, 12%);
      border-color: shade(@primary, 12%);
    }
  }

  .reverse {
    &:hover {
      color: #fff;
      background-color: fade(@primary, 80%);
      border-color: fade(@primary, 80%);
    }

    &:active {
      color: #fff;
      background-color: shade(@primary, 12%);
      border-color: shade(@primary, 12%);
    }
  }

  .small {
    line-height: 22px;
    padding: 0 7px;
    font-size: 14px;
  }

  .middle {
    line-height: 30px;
    padding: 0 15px;
    font-size: 14px;
  }

  .large {
    line-height: 38px;
    padding: 0 15px;
    font-size: 16px;
  }

  .widthType {
    padding: 0;
    text-align: center;
  }

  .disabled {
    color: rgba(0, 0, 0, 0.25);
    background-color: #f5f5f5;
    border-color: #d9d9d9;
    text-shadow: none;
    box-shadow: none;
    cursor: not-allowed;

    &:hover,
    &:active {
      color: rgba(0, 0, 0, 0.25);
      background-color: #f5f5f5;
      border-color: #d9d9d9;
      text-shadow: none;
      box-shadow: none;
      transform: none;
    }
  }
}

.center {
  display: block;
  text-align: center;
}
</style>
