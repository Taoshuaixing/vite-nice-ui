<template>
  <n-row>
    <n-col class="icon-box" :span="6" v-for="(icon, index) of icons" :key="index" @click="handleCopy(icon)">
      <n-icon :type="icon" />
      <div class="name">
        {{ icon }}
      </div>
    </n-col>
  </n-row>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import feather from 'feather-icons'
import Message from '../../../packages/components/message/index' //此处为本地示例，请使用import {Message} from "vite-nice-ui";引入

const { copy, isSupported } = useClipboard()
const icons = Object.keys(feather.icons)

const handleCopy = (text: string) => {
  if (!isSupported) {
    Message({
      type: 'error',
      text: '您的浏览器不支持Clipboard API!',
    })
    return
  }
  const htmlText = `<n-icon type="${text}" />`
  copy(htmlText)
  Message({
    type: 'success',
    text: '复制成功!',
  })
}
</script>

<style lang="less" scoped>
.icon-box {
  margin-top: 40px;
  transition: all 0.5s;
  cursor: pointer;
  &:hover {
    color: #9708cc;
  }
  .name {
    white-space: nowrap;
    color: inherit;
  }
}

.icon-box:hover {
  transform: translateY(-3px);
}
</style>
