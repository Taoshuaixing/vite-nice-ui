<template>
  <Transition name="slide-fade">
    <div :class="['nice-message', customClass]" :style="style[type]" v-show="isShow">
      <template v-if="isText">
        <n-icon :type="style[type].icon"></n-icon>
        <span class="text">{{ text }}</span>
      </template>
      <template v-else>
        <slot />
      </template>
    </div>
  </Transition>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive, computed } from 'vue'
import { NIcon } from 'vite-nice-ui'
const props = defineProps({
  text: {
    type: [String, Object],
    default: '',
  },
  type: {
    type: String,
    default: 'info',
  },
  icon: String,
  textColor: String,
  bgColor: String,
  customClass: String,
})
const state = reactive({
  style: {
    info: {
      icon: props.icon || 'alert-circle',
      color: '#909398',
      backgroundColor: '#F4F4F5',
      borderColor: '#bdbdbd',
    },
    warn: {
      icon: props.icon || 'alert-triangle',
      color: '#E6A23B',
      backgroundColor: '#FDF6EC',
      borderColor: '#fad39d',
    },
    error: {
      icon: props.icon || 'meh',
      color: '#F56C6B',
      backgroundColor: '#FEEFF0',
      borderColor: '#ffafb4',
    },
    success: {
      icon: props.icon || 'smile',
      color: '#67C23A',
      backgroundColor: '#F0F9EB',
      borderColor: '#bbfc95',
    },
    custom: {
      icon: props.icon,
      color: props.textColor,
      backgroundColor: props.bgColor,
      borderColor: props.bgColor,
    },
  },
})
const isShow = ref(false)
const { style }: any = state
const isText = computed(() => {
  return typeof props.text === 'string'
})
onMounted(() => {
  isShow.value = true
})
</script>
<style scoped lang="less">
.slide-fade-enter-active {
  color: #bdbdbd;
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

div.slide-fade-enter-from,
div.slide-fade-leave-to {
  transform: translate3d(-50%, -75px, 0);
}
.nice-message {
  position: fixed;
  z-index: 9999;
  left: 50%;
  top: 25px;
  transform: translateX(-50%);
  height: auto;
  display: flex;
  align-items: center;
  min-height: 45px;
  padding: 5px 25px;
  border: 0.5px solid #e4e4e4;
  background: #f5f5f5;
  color: #999;
  border-radius: 4px;
  i {
    margin-right: 8px;
    vertical-align: middle;
    font-size: 16px;
    height: 100%;
    display: inline-block;
    float: left;
  }
  .text {
    vertical-align: middle;
    font-size: 14px;
    line-height: 22px;
  }
}
</style>
