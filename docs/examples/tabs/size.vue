<template>
  <n-tabs size="large" :tab-pages="tabPages" v-model:active-key="activeKey" />
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const tabPages = ref([
  {
    key: '1',
    tab: 'Tab 1',
    content: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    tab: 'Tab 2',
    content: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    tab: 'Tab 3',
    content: 'Content of Tab Pane 3',
  },
  {
    key: '4',
    tab: 'Tab 4',
    content: 'Content of Tab Pane 4',
  },
  {
    key: '5',
    tab: 'Tab 5',
    content: 'Content of Tab Pane 5',
  },
  {
    key: '6',
    tab: 'Tab 6',
    content: 'Content of Tab Pane 6',
  },
])
const activeKey = ref('1')
watchEffect(() => {
  // 回调立即执行一次，同时会自动跟踪回调中所依赖的所有响应式依赖
  console.log('activeKey:', activeKey.value)
})
</script>
