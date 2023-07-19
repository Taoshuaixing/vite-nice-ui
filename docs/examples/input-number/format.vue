<template>
  <n-input-number :width="120" :step="10" :formatter="formatter" v-model:value="formatValue" />
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { moneyFormat } from 'vite-nice-ui'
const formatValue = ref(1000)
watchEffect(() => {
  console.log('formatValue:', formatValue.value)
})
function formatter(num: string): string {
  return moneyFormat(num, 2)
}
</script>
