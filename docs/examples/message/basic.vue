<template>
  <n-button @click="openMsg">消息提示</n-button>
</template>
<script setup lang="ts">
import NMessage from '../../../packages/components/message' //此处为本地示例，请使用import {Message} from "vite-nice-ui";引入
// import { Message } from 'vite-nice-ui' //此处为本地示例，请使用import {Message} from "vite-nice-ui";引入
const openMsg = () => {
  console.log(NMessage)

  NMessage({
    text: '默认消息提示',
    timeOut: 30000,
  })
}
</script>
