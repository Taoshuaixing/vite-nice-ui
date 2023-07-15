<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(true)
function onClick(e: Event) {
  console.log('click')
}
</script>
<template>
  <n-button :loading="loading" @click="onClick">Default</n-button>
  <n-button :loading="loading" type="primary" @click="onClick">Primary</n-button>
  <n-button :loading="loading" type="danger" @click="onClick">Danger</n-button>
  <h3>
    Loading state:
    <Switch v-model:checked="loading" />
  </h3>
</template>
