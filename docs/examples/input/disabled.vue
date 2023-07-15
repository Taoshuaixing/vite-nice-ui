<template>
  <n-input v-model="value1" disabled placeholder="禁用状态"></n-input>
</template>
<script setup>
import { ref } from 'vue'
const value1 = ref('')
</script>
