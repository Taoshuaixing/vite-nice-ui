<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
</script>
<template>
  <div class="n-box-flex">
    <n-loading tip="加载中..." :loading="loading" />
  </div>
</template>
