<!--
 * @Descripttion: 
 * @version: 
 * @Author: 陶帅星
 * @Date: 2023-07-13 18:55:43
 * @LastEditors: 陶帅星
 * @LastEditTime: 2023-07-13 18:57:37
-->
<template>
  <n-row>
    <n-col :span="12"><div class="col-box-2 col-box">12</div></n-col>
    <n-col :span="12"><div class="col-box-1 col-box">12</div></n-col>
  </n-row>
  <n-row>
    <n-col :span="8"><div class="col-box-1 col-box">8</div></n-col>
    <n-col :span="8"><div class="col-box-2 col-box">8</div></n-col>
    <n-col :span="8"><div class="col-box-1 col-box">8</div></n-col>
  </n-row>
  <n-row>
    <n-col :span="6"><div class="col-box-2 col-box">6</div></n-col>
    <n-col :span="6"><div class="col-box-1 col-box">6</div></n-col>
    <n-col :span="6"><div class="col-box-2 col-box">6</div></n-col>
    <n-col :span="6"><div class="col-box-1 col-box">6</div></n-col>
  </n-row>
  <n-row>
    <n-col :span="4"><div class="col-box-1 col-box">4</div></n-col>
    <n-col :span="2"><div class="col-box-2 col-box">2</div></n-col>
    <n-col :span="4"><div class="col-box-1 col-box">4</div></n-col>
    <n-col :span="6"><div class="col-box-2 col-box">6</div></n-col>
    <n-col :span="8"><div class="col-box-1 col-box">8</div></n-col>
  </n-row>
</template>
<script setup lang="ts"></script>
<style lang="less" scoped>
.col-box {
  height: 34px;
  margin-bottom: 10px;
  text-align: center;
  line-height: 34px;
}
.col-box-1 {
  background-color: #9eaaaf;
  color: #333;
}
.col-box-2 {
  background-color: #505050;
  color: #fff;
}
</style>
