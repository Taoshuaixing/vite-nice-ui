<template>
  <div class="n-btn-warp">
    <a
      class="n-btn"
      :class="[type, size]"
    >
      <slot>{{ name }}</slot>
    </a>
  </div>
</template>

<script setup lang='ts'>
defineOptions({
  name: 'nButton'
})
interface Props {
  name?: string // 默认文本 string | slot
  type?: 'default' | 'primary' | 'danger' // 类型
  size?: 'small' | 'middle' | 'large' // 尺寸
}
const props = withDefaults(defineProps<Props>(), {
  name: '按钮',
  type: 'default',
  size: 'middle'
})
console.log(props);

</script>

<style lang="less" scoped>
@import './index.less';
</style>