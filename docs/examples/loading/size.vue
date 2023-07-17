<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
</script>
<template>
  <div class="n-box-flex">
    <n-loading :loading="loading" size="small" />
    <n-loading :loading="loading" />
    <n-loading :loading="loading" size="large" />
    <n-loading :loading="loading" size="small" indicator="static-circle" />
    <n-loading :loading="loading" indicator="static-circle" />
    <n-loading :loading="loading" size="large" indicator="static-circle" />
    <n-loading :loading="loading" size="small" indicator="dynamic-circle" />
    <n-loading :loading="loading" indicator="dynamic-circle" />
    <n-loading :loading="loading" size="large" indicator="dynamic-circle" />
  </div>
</template>
