<script setup lang="ts">
import { ref } from 'vue'
const images = ref([
  {
    src: 'http://img63.ddimg.cn/upload_img/00890/tsx/tsx-1-1689673034.jpg',
    name: 'image-1.jpg',
  },
  {
    src: 'http://img63.ddimg.cn/upload_img/00890/tsx/tsx-2-1689673034.jpg',
    name: 'image-2.jpg',
  },
  {
    src: 'http://img63.ddimg.cn/upload_img/00890/tsx/tsx-3-1689673034.jpg',
    name: 'image-3.jpg',
  },
  {
    src: 'http://img63.ddimg.cn/upload_img/00890/tsx/tsx-4-1689673034.jpg',
    name: 'image-4.jpg',
  },
  {
    src: 'http://img63.ddimg.cn/upload_img/00890/tsx/tsx-5-1689673034.jpg',
    name: 'image-5.jpg',
  },
])
</script>
<template>
  <n-image :src="images" loop previewMode />
</template>
