<template>
  <n-button @click="openMsg1">消息提示</n-button>
  <n-button @click="openMsg2">5秒后消失</n-button>
</template>
<script setup lang="ts">
import Message from '../../../packages/components/message/index' //此处为本地示例，请使用import {Message} from "vite-nice-ui";引入
const openMsg1 = () => {
  Message({
    text: '自定义Icon！',
    icon: 'codepen',
  })
}
const openMsg2 = () => {
  Message({
    text: '5秒后消失！',
    icon: 'clock',
    timeout: 5000,
  })
}
</script>
