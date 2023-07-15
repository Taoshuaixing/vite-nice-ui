<template>
  <p>
    <span>Slow:</span>
    <n-icon type="loader" animation="spin" animation-speed="slow"></n-icon>
    <n-icon type="settings" animation="spin" animation-speed="slow"></n-icon>
    <n-icon type="sun" animation="spin" animation-speed="slow"></n-icon>
    <n-icon type="rotate-cw" animation="spin" animation-speed="slow"></n-icon>
    <n-icon type="rotate-cw" animation="pulse" animation-speed="slow"></n-icon>
  </p>
  <p>
    <span>Normal:</span>
    <n-icon type="loader" animation="spin"></n-icon>
    <n-icon type="settings" animation="spin"></n-icon>
    <n-icon type="sun" animation="spin"></n-icon>
    <n-icon type="rotate-cw" animation="spin"></n-icon>
    <n-icon type="rotate-cw" animation="pulse"></n-icon>
  </p>
  <p>
    <span>Fast:</span>
    <n-icon type="loader" animation="spin" animation-speed="fast"></n-icon>
    <n-icon type="settings" animation="spin" animation-speed="fast"></n-icon>
    <n-icon type="sun" animation="spin" animation-speed="fast"></n-icon>
    <n-icon type="rotate-cw" animation="spin" animation-speed="fast"></n-icon>
    <n-icon type="rotate-cw" animation="pulse" animation-speed="fast"></n-icon>
  </p>
</template>

<style scoped>
p {
  align-items: center;
  display: flex;
  margin-bottom: 0.5rem;
}

p:last-child {
  margin-bottom: 0;
}

p > span {
  margin-right: 0.5rem;
  text-align: right;
  width: 4rem;
}

p > i {
  margin-right: 0.5rem;
}
</style>
