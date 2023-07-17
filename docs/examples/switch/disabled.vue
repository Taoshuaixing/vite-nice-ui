<script setup lang="ts">
import { ref } from 'vue'
const checked = ref(false)
</script>
<template>
  <n-switch v-model:checked="checked" disabled />
</template>
