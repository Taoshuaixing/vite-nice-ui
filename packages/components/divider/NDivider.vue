<template>
  <div
    :class="[
      `n-divider ${position}`,
      {
        dashed: dashed,
        margin24: !showText,
        marginLeft: positionMargin !== '' && position === 'left',
        marginRight: positionMargin !== '' && position === 'right',
      },
    ]"
    :style="`----border-width:${borderWidth}px`"
  >
    <span class="u-text" v-if="position === 'left'" :style="`margin-left: ${margin};`" ref="text" v-show="showText">
      <slot></slot>
    </span>
    <span class="u-text" v-else-if="position === 'right'" :style="`margin-right: ${margin};`" ref="text" v-show="showText">
      <slot></slot>
    </span>
    <span class="u-text" v-else ref="text" v-show="showText">
      <slot></slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface Props {
  dashed?: boolean // 是否为虚线
  position?: 'left' | 'center' | 'right' // 分割线标题的位置
  positionMargin?: string | number // 标题和最近 left/right 边框之间的距离，去除了分割线，同时 position 必须为 left 或 right
  borderWidth?: number // 分割线宽度
}
const props = withDefaults(defineProps<Props>(), {
  dashed: false,
  position: 'center', // 可选 left center right
  positionMargin: '',
  borderWidth: 1,
})
const text = ref()
const showText = ref(true)

//通用margin
const margin = computed(() => {
  if (props.positionMargin !== '') {
    if (typeof props.positionMargin === 'number') {
      return props.positionMargin + 'px'
    } else {
      return props.positionMargin
    }
  }
})

onMounted(() => {
  if (!text.value.offsetHeight) {
    showText.value = false
  }
})
</script>

<style lang="less" scoped>
.n-divider {
  display: flex;
  align-items: center;
  margin: 16px 0;
  width: 100%;
  min-width: 100%;
  &:before,
  &:after {
    position: relative;
    width: 50%;
    border-top-width: var(--border-width);
    border-top-style: solid;
    border-top-color: rgba(5, 5, 5, 0.06);
    transform: translateY(50%);
    content: '';
  }
  .u-text {
    display: inline-block;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.88);
    font-weight: 500;
    line-height: 1.571;
    white-space: nowrap;
    text-align: center;
    padding: 0 16px;
  }
}
.dashed {
  &:before {
    border-top-style: dashed;
  }
  &:after {
    border-top-style: dashed;
  }
}
.left {
  &:before {
    width: 5%;
  }
  &:after {
    width: 95%;
  }
}
.right {
  &:before {
    width: 95%;
  }
  &:after {
    width: 5%;
  }
}
.margin24 {
  margin: 24px 0;
}
.marginLeft {
  &:before {
    width: 0;
  }
  &:after {
    width: 100%;
  }
}
.marginRight {
  &:before {
    width: 100%;
  }
  &:after {
    width: 0;
  }
}
</style>
