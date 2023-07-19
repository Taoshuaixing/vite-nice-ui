# 表格 Table

<script setup lang="ts">
import {onMounted} from 'vue'
import Message from '../../packages/components/message/index.ts' 

onMounted(() => {
  Message({
    type:'warn',
    text: '功能开发中，敬请期待！',
    timeOut: 5000,
  })
})
</script>