<script setup lang="ts">
function onClick(e: Event) {
  console.log('click')
}
</script>
<template>
  <n-button :width="120" :height="40" :border-radius="8" size="large" @click="onClick">
    <p style="font-size: 18px">自定义样式</p>
  </n-button>
</template>
