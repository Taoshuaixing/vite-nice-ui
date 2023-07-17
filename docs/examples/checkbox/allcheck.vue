<script setup lang="ts">
import { ref, watch, watchEffect, computed } from 'vue'

const options = ref([
  {
    label: '北京市',
    value: 1,
  },
  {
    label: '纽约市',
    value: 2,
  },
  {
    label: '布宜诺斯艾利斯',
    value: 3,
  },
  {
    label: '伊斯坦布尔',
    value: 4,
  },
  {
    label: '拜占庭',
    value: 5,
  },
  {
    label: '君士坦丁堡',
    value: 6,
  },
])

const value = ref([2]) // 多选框v-model
watchEffect(() => {
  console.log('value:', value.value)
})
const checkAll = ref(false) // 全选v-model
const indeterminate = computed(() => {
  // 全选样式控制
  if (value.value.length > 0 && value.value.length < options.value.length) {
    return true
  } else {
    return false
  }
})
watch(checkAll, to => {
  console.log('checkAll:', to)
  if (to) {
    value.value = options.value.map(option => option.value)
  } else {
    value.value = []
  }
})
</script>
<template>
  <n-checkbox class="mb10" :indeterminate="indeterminate" v-model:checked="checkAll">Check All</n-checkbox>
  <br />
  <n-checkbox :options="options" v-model:value="value" />
</template>
<style>
.mb10 {
  margin-bottom: 10px;
}
</style>
