<template>
  <n-input v-model="value1" leftIcon="m-icon-search"></n-input>
  <n-input v-model="value2" rightIcon="m-icon-calendar"></n-input>
</template>
<script setup>
import { ref } from 'vue'
const value1 = ref('')
const value2 = ref('')
</script>
