<template>
  <span class="n-mark" :class="getMarkClassName" :style="bold ? 'font-weight:bold' : 'font-weight:normal'" @click="openTo(to)">
    <slot />
    <n-icon class="n-icon" type="external-link" size="13" v-if="to" />
  </span>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import NMessage from '../message/NMessage.vue'

type markType = 'primary' | 'info' | 'success' | 'error' | 'warning' | 'normal'
const props = defineProps({
  type: {
    type: String as PropType<markType>,
    default: 'normal',
  },
  round: {
    type: Boolean,
    default: false,
  },
  to: {
    type: String,
    default: '',
  },
  bold: {
    type: Boolean,
    default: false,
  },
})
const openTo = (to: string) => {
  const reg = /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/
  if (reg.test(to)) {
    window.open(to)
  }
}
//添加class
const getMarkClassName = computed(() => {
  const { type, round } = props
  const to = !!props.to
  return object2class('n-mark', { type, round, to })
})
const object2class = (prefix: string, props: Object) => {
  let className = ''
  for (const [key, value] of Object.entries(props)) {
    if (typeof value === 'boolean' && value) {
      className += ` ${prefix}-${key}`
    } else if (typeof value === 'string') {
      className += ` ${prefix}-${key}-${value}`
    }
  }
  return className
}
</script>

<style lang="less" scoped>
.n-mark {
  position: relative;
  display: inline;
  border-radius: 4px;
  padding: 2px 6px;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}
.n-icon {
  position: absolute;
  top: -5px;
  right: -7px;
}
.n-mark-to {
  cursor: pointer;
}
.n-mark-round {
  border-radius: 20px;
}
.n-mark-bold {
  border-radius: 800;
}

.n-mark-type-primary {
  color: var(--nice-primary-color-dark);
  background-color: var(--nice-primary-color-light);
}
.n-mark-type-info {
  color: var(--nice-info-color-dark);
  background-color: var(--nice-info-color-light);
}
.n-mark-type-success {
  color: var(--nice-success-color-dark);
  background-color: var(--nice-success-color-light);
}

.n-mark-type-warning {
  color: var(--nice-warning-color-dark);
  background-color: var(--nice-warning-color-light);
}
.n-mark-type-error {
  color: var(--nice-error-color-dark);
  background-color: var(--nice-error-color-light);
}
.n-mark-type-normal {
  color: var(--nice-text-color-2);
  background-color: var(--nice-normal-color-light);
}
</style>
../../directives/message/NMessage.vue
