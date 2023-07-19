<template>
  <n-input-number :step="0.1" v-model:value="value" />
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const value = ref(3)
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
