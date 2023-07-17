<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
</script>
<template>
  <n-loading :loading="loading">
    <p class="loading-content">
      当 loading 为 false 时，不显示 loading 状态；当 loading 为 true 时，显示 loading 效果；如果不设置 tip 描述文案时，则只有 loading 效果水平垂直居中；如果设置了 tip 描述文案，则 loading 效果和 tip
      描述文案一起水平垂直居中。
    </p>
  </n-loading>
  <br />
  <h4>
    Loading state:
    <n-switch v-model:checked="loading" />
  </h4>
</template>
<style scoped>
.loading-content {
  display: inline-block;
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 16px;
}
</style>
