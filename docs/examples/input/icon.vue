<template>
  <n-input v-model="value1" leftIcon="codepen"></n-input>
  <n-input v-model="value2" rightIcon="chrome"></n-input>
</template>
<script setup>
import { ref } from 'vue'
const value1 = ref('')
const value2 = ref('')
</script>
