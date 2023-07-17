<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
</script>
<template>
  <div class="n-box-flex">
    <n-loading color="#fadb14" :loading="loading" />
    <n-loading color="#fadb14" :loading="loading" indicator="static-circle" />
    <n-loading color="#fadb14" :loading="loading" indicator="dynamic-circle" />
  </div>
</template>
