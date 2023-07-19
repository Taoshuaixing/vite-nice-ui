<template>
  <n-button @click="openMsg">消息提示</n-button>
</template>
<script setup lang="ts">
import { NMessage } from 'vite-nice-ui'
const openMsg = () => {
  NMessage({
    text: '默认消息提示',
    timeOut: 3000,
  })
}
</script>
