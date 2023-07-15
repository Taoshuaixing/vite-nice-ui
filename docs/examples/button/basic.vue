<script setup lang="ts">
function onClick(e: Event) {
  console.log('click')
}
</script>
<template>
  <n-button @click="onClick">Default</n-button>
  <n-button effect="reverse" @click="onClick">Reverse</n-button>
  <n-button type="primary" @click="onClick">Primary</n-button>
  <n-button type="danger" @click="onClick">Danger</n-button>
  <n-button disabled @click="onClick">Disabled</n-button>
</template>
