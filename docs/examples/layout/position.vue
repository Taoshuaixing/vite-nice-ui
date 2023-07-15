<template>
  <n-row>
    <n-col :span="10"><div class="col-box-2 col-box">10</div></n-col>
    <n-col :span="12" :offset="2"><div class="col-box-1 col-box">12</div></n-col>
  </n-row>
  <n-row>
    <n-col :span="8"><div class="col-box-1 col-box">8</div></n-col>
    <n-col :span="8" :offset="8"><div class="col-box-1 col-box">8</div></n-col>
  </n-row>
  <n-row>
    <n-col :span="2"><div class="col-box-2 col-box">2</div></n-col>
    <n-col :span="6" :offset="4"><div class="col-box-1 col-box">6</div></n-col>
    <n-col :span="6" :offset="6"><div class="col-box-2 col-box">6</div></n-col>
  </n-row>
  <n-row>
    <n-col :span="4"><div class="col-box-1 col-box">4</div></n-col>
    <n-col :span="2" :offset="4"><div class="col-box-2 col-box">2</div></n-col>
    <n-col :span="4" :offset="2"><div class="col-box-1 col-box">4</div></n-col>
    <n-col :span="6" :offset="2"><div class="col-box-2 col-box">6</div></n-col>
  </n-row>
</template>

<style lang="less" scoped>
.col-box {
  height: 34px;
  margin-bottom: 10px;
  text-align: center;
  line-height: 34px;
}
.col-box-1 {
  background-color: #f4d7ff;
  color: #333;
}
.col-box-2 {
  background-color: #e59fff;
  color: #fff;
}
</style>
