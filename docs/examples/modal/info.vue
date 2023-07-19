<template>
  <n-button type="primary" @click="showInfoModal('Some descriptions ...')">信息展示</n-button>
  <n-modal ref="modal" :visible="visible" @know="onKnow" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const modal = ref()
const visible = ref(false)
const center = ref(true)
function onKnow() {
  // “我知道了”按钮回调
  visible.value = false
}

function showInfoModal(content: string) {
  modal.value.info({
    title: 'Do you See these items ?',
    content: content,
  })
  center.value = true
  visible.value = true
}
</script>
