<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
</script>
<template>
  <div class="n-box-flex">
    <n-loading tip="静态加载..." :loading="loading" indicator="static-circle" />
    <n-loading tip="动态加载..." :loading="loading" indicator="dynamic-circle" />
  </div>
</template>
