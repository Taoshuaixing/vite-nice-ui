<template>
  <n-button type="primary" @click="showFixModal('Some descriptions ...')">position</n-button>
  <n-modal ref="modal" :center="false" :top="120" :visible="visible" @know="onKnow" />
</template>
<script setup lang="ts">
import { ref } from 'vue'

const modal = ref()
const center = ref(true)
const visible = ref(false)
function onKnow() {
  // “我知道了”按钮回调
  visible.value = false
}

function showFixModal(content: string) {
  modal.value.info({
    title: 'Do you See these items ?',
    content: content,
  })
  center.value = false
  visible.value = true
}
</script>
