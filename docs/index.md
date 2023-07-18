---
layout: home

title: Vite Nice UI
# titleTemplate: Nice UI Components Library

hero:
  name: Vite Nice UI
  text: Nice UI 组件库
  tagline: 基于 Vue3 + TS + Vite 开发
  image:
    src: /NiceUI.png
    alt: Vite Nice UI
  actions:
    - theme: brand
      text: Get Started
      link: /modules/started
    - theme: alt
      text: View on GitHub
      link: https://github.com/Taoshuaixing/vite-nice-ui
    - theme: alt
      text: View on NPM
      link: https://www.npmjs.com/package/vite-nice-ui
      # 按钮下方的描述
features:
  - icon: 😊
    title: 全面支持Vue3
    details: 专为vue3版本开发。
    # link: /column/views/guide
  - icon: 🎨
    title: 更友好的渲染
    details: 极少的代码量，极简配置项。
  - icon: ⚡️
    title: 更快的响应
    details: 配合vue3的composition API，更快的响应。
---

<script setup lang="ts">
import { onMounted } from 'vue'
/*
  远程读取 github 仓库中 package.json 文件中的 version 版本号
*/
onMounted(() => {
  if(document.getElementsByClassName('version-tag').length < 1){
  return fetch('https://api.github.com/repos/Taoshuaixing/vite-nice-ui/contents/package.json?ref=main', {
    headers: {
      Accept: 'application/vnd.github.v3.raw',
    }, 
  })
    .then(res => res.json())
    .then(json => json.version ?? '')
    .then(version => { 
      if (!version) return
      const tagLineParagragh = document.querySelector('div.VPHero.has-image.VPHomeHero > div > div.main > p.tagline')
      const docsVersionSpan = document.createElement('samp')
      docsVersionSpan.classList.add('version-tag')
      docsVersionSpan.innerText = `v${version}`
      tagLineParagragh?.appendChild(docsVersionSpan)
    })
  }
})
</script>


