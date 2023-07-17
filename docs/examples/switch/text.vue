<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const checked = ref(false)
watchEffect(() => {
  console.log('checked:', checked.value)
})
</script>
<template>
  <n-switch v-model:checked="checked" checkedInfo="开" uncheckedInfo="关" />
</template>
