<!--
 * @Descripttion: 
 * @version: 
 * @Author: 陶帅星
 * @Date: 2023-07-13 18:16:40
 * @LastEditors: 陶帅星
 * @LastEditTime: 2023-07-13 19:14:19
-->
<template>
  <div class="nice-row-default"><slot></slot></div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'NRow',
})
</script>

<style lang="less" scoped>
.nice-row-default {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
