<template>
  <n-button @click="openMsg">消息提示</n-button>
</template>
<script setup lang="ts">
import { NMessage } from 'vite-nice-ui' //此处为本地示例，请使用import {Message} from "vite-nice-ui";引入
const openMsg = () => {
  NMessage({
    text: '默认消息提示',
    timeOut: 30000,
  })
}
</script>
