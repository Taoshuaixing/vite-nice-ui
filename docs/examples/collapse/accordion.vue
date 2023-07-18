<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const collapseData = ref([
  {
    key: '1',
    header: '内容区 1',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.',
  },
  {
    key: '2',
    header: '内容区 2',
    text: `  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.
  A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`,
  },
  {
    key: '3',
    header: '内容区 3',
    text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.',
  },
])
const key = ref('1')
watchEffect(() => {
  console.log('key:', key.value)
})
</script>
<template>
  <n-collapse :collapse-data="collapseData" v-model:active-key="key" />
</template>
