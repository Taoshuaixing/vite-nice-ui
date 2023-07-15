<script setup lang="ts">
function onClick(e: Event) {
  console.log('click')
}
</script>
<template>
  <n-button size="small" @click="onClick">Small</n-button>
  <n-button @click="onClick">Default</n-button>
  <n-button size="large" @click="onClick">Large</n-button>
</template>
