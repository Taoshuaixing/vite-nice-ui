<template>
  <n-button @click="openMsg1">消息提示</n-button>
  <n-button @click="openMsg2">5秒后消失</n-button>
</template>
<script setup lang="ts">
import { NMessage } from '../../../packages/components/message'
const openMsg1 = () => {
  NMessage({
    text: '自定义Icon！',
    icon: 'codepen',
  })
}
const openMsg2 = () => {
  NMessage({
    text: '5秒后消失！',
    icon: 'clock',
    timeout: 5000,
  })
}
</script>
