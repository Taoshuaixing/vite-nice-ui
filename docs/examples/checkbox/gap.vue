<script setup lang="ts">
import { ref, watchEffect } from 'vue'

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
</script>
<template>
  <n-checkbox :gap="24" :options="options" v-model:value="value" />
</template>
