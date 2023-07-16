import { createVNode, render } from 'vue'
import Message from './Message.vue'

export default ({ text, type, timeOut, icon, textColor, bgColor, customClass }: any) => {
  // 动态创建一个DOM容器
  const div: any = typeof document !== 'undefined' ? (typeof document.createElement !== 'undefined' ? document.createElement('div') : '') : ''
  div.setAttribute('class', 'nice-meassage-container')
  if (typeof document !== 'undefined') {
    document.body.appendChild(div)
  }
  let timer: any = null
  // 传递给组件的选项
  const vnode: any = createVNode(Message, { text, type, timeOut, icon, textColor, bgColor, customClass }, [text])
  render(vnode, div)
  clearTimeout(timer)
  timer = setTimeout(() => {
    render(vnode, div)
    if (typeof document !== 'undefined') {
      document.body.removeChild(div)
    }
    clearTimeout(timer)
  }, timeOut || 2500)
}
