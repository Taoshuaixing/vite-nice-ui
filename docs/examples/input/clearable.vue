<template>
  <n-input v-model="value1" clearable @clear="clear" placeholder="可清空"></n-input>
</template>
<script setup>
import { ref } from 'vue'
const value1 = ref('')
const clear = () => {
  console.log('清空')
}
</script>
