import { defineConfig } from 'vitepress'

export default defineConfig({
  title: `Vite Nice UI`,
  description: 'Nice UI 组件库',
  base: '/vite-nice-ui/',

  head: [
    // 网站图标
    ['link', { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }],
  ],
  appearance: true, // 默认 true，设为 false 则无法切换dark/light主题，可选 'dark' true false
  markdown: {
    lineNumbers: false, // 是否显示行数，默认false
  },
  themeConfig: {
    logo: '/favicon.ico',
    editLink: {
      pattern: 'https://github.com/Taoshuaixing/vite-nice-ui/blob/main/docs/:path',
      text: '源码 · 文档',
    },
    // 默认支持icon包括：'discord'|'facebook'|'github'|'instagram'|'linkedin'|'mastodon'|'slack'|'twitter'|'youtube'
    socialLinks: [{ icon: 'github', link: 'https://github.com/Taoshuaixing/vite-nice-ui' }],
    // vitepress 内置 search
    search: {
      provider: 'local',
    },
    // algolia 搜索服务 与 内置 search 可二选一
    // algolia: {
    // 	appId: '1LSW22DJLN',
    // 	apiKey: 'efc85e434f49f86ff3766016cf4c64e5',
    // 	indexName: 'vite-nice-ui',
    // 	placeholder: '请输入关键词',
    // },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present The TSXWEB',
    },
    nav: [
      { text: '组件', link: '/modules/started', activeMatch: '/modules/' },
      {
        text: '链接',
        items: [
          { text: 'My Github', link: 'https://github.com/Taoshuaixing' },
          {
            items: [
              {
                text: 'vue',
                link: 'https://cn.vuejs.org/',
              },
              {
                text: 'markdown',
                link: 'https://markdown.com.cn/',
              },
              {
                text: 'vitepress',
                link: 'https://vitepress.dev/',
              },
            ],
          },
        ],
      },
    ],

    sidebar: {
      '/modules/': [
        {
          text: '介绍',
          items: [
            {
              text: '快速上手',
              link: '/modules/started',
            },
            {
              text: '未来计划',
              link: '/modules/future-plans',
            },
          ],
        },
        {
          text: '常规组件',
          items: [
            {
              text: '布局 Layout',
              link: '/modules/layout',
            },
            {
              text: '颜色 Color',
              link: '/modules/color',
            },
            {
              text: '图标 Icon',
              link: '/modules/icon',
            },
          ],
        },
        {
          text: '通用组件',
          items: [
            {
              text: '按钮 Button',
              link: '/modules/button',
            },
            {
              text: '输入框 Input',
              link: '/modules/input',
            },
            {
              text: '多选框 Checkbox',
              link: '/modules/checkbox',
            },
            {
              text: '折叠面板 Collapse',
              link: '/modules/collapse',
            },
            {
              text: '分割线 Divider',
              link: '/modules/divider',
            },
            {
              text: '卡片 Card',
              link: '/modules/card',
            },
            {
              text: '空状态 Empty',
              link: '/modules/empty',
            },
            {
              text: '图片 Image',
              link: '/modules/image',
            },
            {
              text: '数字输入框 InputNumber',
              link: '/modules/inputnumber',
            },

            {
              text: '单选框 Radio',
              link: '/modules/radio',
            },
            {
              text: '开关 Switch',
              link: '/modules/switch',
            },
          ],
        },
        {
          text: '数据组件',
          items: [
            {
              text: '表格 Table',
              link: '/modules/table',
            },
            {
              text: '标签页 Tabs',
              link: '/modules/tabs',
            },
            {
              text: '文字滚动 TextScroll',
              link: '/modules/textscroll',
            },
            {
              text: '分页 Pagination',
              link: '/modules/pagination',
            },
            {
              text: '进度条 Progress',
              link: '/modules/progress',
            },
          ],
        },
        {
          text: '交互组件',
          items: [
            {
              text: '文字提示 Tooltip',
              link: '/modules/tooltip',
            },
            {
              text: '加载中 Spin',
              link: '/modules/spin',
            },
            {
              text: '全局提示 Message',
              link: '/modules/message',
            },
            {
              text: '模态框 Modal',
              link: '/modules/modal',
            },
          ],
        },
      ],
    },
  },
})
