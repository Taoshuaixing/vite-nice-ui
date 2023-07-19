<template>
  <n-input-number :min="0" :max="10" v-model:value="value" />
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
const value = ref(3)
watchEffect(() => {
  console.log('value:', value.value)
})
</script>
