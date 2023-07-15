<template>
  <n-input v-model="password" type="password" showPassword placeholder="请输入密码"></n-input>
</template>

<script setup>
import { ref } from 'vue'
const password = ref('')
</script>
