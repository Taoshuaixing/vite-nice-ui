<template>
  <n-button type="primary" @click="showEraseModal('Some descriptions ...')">基本使用</n-button>
  <n-modal ref="modal" :loading="loading" :visible="visible" @cancel="onCancel" @ok="onConfirm" />
</template>
<script setup lang="ts">
import { ref } from 'vue'

const modal = ref()
const loading = ref(false)
const visible = ref(false)
const center = ref(true)

function showEraseModal(content: string) {
  modal.value.erase({
    title: 'Do you Want to delete these items ?',
    content: content,
  })
  center.value = true
  visible.value = true
}
function onCancel() {
  // “取消”按钮回调
  visible.value = false
}
function onConfirm() {
  // “确定”按钮回调
  loading.value = true // 开启加载状态
  setTimeout(() => {
    visible.value = false
    loading.value = false
  }, 500)
}
</script>
