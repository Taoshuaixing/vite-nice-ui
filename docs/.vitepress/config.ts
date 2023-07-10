import { defineConfig } from 'vitepress';

export default defineConfig({
	title: `Vite Nice UI`,
	description: 'Nice UI 组件库',
	base: '/vite-nice-ui/',

	head: [
		// 网站图标
		// ['link', { rel: 'icon', type: 'image/svg+xml', href: 'favicon.ico' }],
		['link', { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }],
	],
	appearance: true, // 默认 true，设为 false 则无法切换dark/light主题，可选 'dark' true false
	markdown: {
		lineNumbers: false, // 是否显示行数，默认false
	},
	themeConfig: {
		logo: '/favicon.ico',

		editLink: {
			pattern:
				'https://github.com/themusecatcher/vue-amazing-ui/tree/master/docs/:path',
			text: 'Suggest changes to this page',
		},
		// 默认支持icon包括：'discord'|'facebook'|'github'|'instagram'|'linkedin'|'mastodon'|'slack'|'twitter'|'youtube'
		socialLinks: [
			{ icon: 'github', link: 'https://github.com/Taoshuaixing/vite-nice-ui' },
			// 自定义icon
			// {
			//   icon: {
			//     svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Dribbble</title><path d="M12...6.38z"/></svg>'
			//   },
			//   link: 'https://www.npmjs.com/package/vue-amazing-ui'
			// }
		],

		// search: { // vitepress 内置 search
		//   provider: 'local'
		// },

		algolia: {
			// algolia 搜索服务 与 内置 search 可二选一
			appId: '1LSW22DJLN',
			apiKey: 'efc85e434f49f86ff3766016cf4c64e5',
			indexName: 'vite-nice-ui',
			placeholder: '请输入关键词',
		},

		footer: {
			message: 'Released under the MIT License.',
			copyright: 'Copyright © 2023-present The TSXWEB',
		},

		nav: [
			{ text: '组件', link: '/modules/features', activeMatch: '/modules/' },
			{ text: '工具', link: '/utils/started', activeMatch: '/utils/' },
			{
				text: '链接',
				items: [
					{ text: 'My Github', link: 'https://github.com/Taoshuaixing' },
					{ text: 'My CSDN', link: 'https://blog.csdn.net/Dandrose?type=blog' },
					{
						text: 'Front-end Notes',
						link: 'https://themusecatcher.github.io/front-end-notes/',
					},
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
					text: '指引',
					items: [
						{
							text: '特性',
							link: '/modules/features',
						},
						{
							text: '快速上手',
							link: '/modules/started',
						},
					],
				},
				{
					text: '组件',
					items: [
						{
							text: '面包屑 Breadcrumb',
							link: '/modules/components/breadcrumb',
						},
						{
							text: '按钮 Button',
							link: '/modules/components/button',
						},
						{
							text: '走马灯 Carousel',
							link: '/modules/components/carousel',
						},
						{
							text: '级联选择 Cascader',
							link: '/modules/components/cascader',
						},
						{
							text: '多选框 Checkbox',
							link: '/modules/components/checkbox',
						},
						{
							text: '折叠面板 Collapse',
							link: '/modules/components/collapse',
						},
						{
							text: '倒计时 Countdown',
							link: '/modules/components/countdown',
						},
						{
							text: '日期选择 DatePicker',
							link: '/modules/components/datepicker',
						},
						{
							text: '对话框 Dialog',
							link: '/modules/components/dialog',
						},
						{
							text: '分割线 Divider',
							link: '/modules/components/divider',
						},
						{
							text: '空状态 Empty',
							link: '/modules/components/empty',
						},
						{
							text: '图片 Image',
							link: '/modules/components/image',
						},
						{
							text: '数字输入框 InputNumber',
							link: '/modules/components/inputnumber',
						},
						{
							text: '全局提示 Message',
							link: '/modules/components/message',
						},
						{
							text: '信息提示 Modal',
							link: '/modules/components/modal',
						},
						{
							text: '通知提醒框 Notification',
							link: '/modules/components/notification',
						},
						{
							text: '分页 Pagination',
							link: '/modules/components/pagination',
						},
						{
							text: '进度条 Progress',
							link: '/modules/components/progress',
						},
						{
							text: '二维码 QRCode',
							link: '/modules/components/qrcode',
						},
						{
							text: '单选框 Radio',
							link: '/modules/components/radio',
						},
						{
							text: '评分 Rate',
							link: '/modules/components/rate',
						},
						{
							text: '选择器 Select',
							link: '/modules/components/select',
						},
						{
							text: '滑动输入条 Slider',
							link: '/modules/components/slider',
						},
						{
							text: '加载中 Spin',
							link: '/modules/components/spin',
						},
						{
							text: '步骤条 Steps',
							link: '/modules/components/steps',
						},
						{
							text: '触摸滑动插件 Swiper',
							link: '/modules/components/swiper',
						},
						{
							text: '开关 Switch',
							link: '/modules/components/switch',
						},
						{
							text: '表格 Table',
							link: '/modules/components/table',
						},
						{
							text: '标签页 Tabs',
							link: '/modules/components/tabs',
						},
						{
							text: '文字滚动 TextScroll',
							link: '/modules/components/textscroll',
						},
						{
							text: '时间轴 Timeline',
							link: '/modules/components/timeline',
						},
						{
							text: '文字提示 Tooltip',
							link: '/modules/components/tooltip',
						},
						{
							text: '上传 Upload',
							link: '/modules/components/upload',
						},
						{
							text: '播放器 Video',
							link: '/modules/components/video',
						},
						{
							text: '瀑布流 Waterfall',
							link: '/modules/components/waterfall',
						},
					],
				},
			],
			'/utils/': [
				{
					text: '指引',
					items: [
						{
							text: '快速上手',
							link: '/utils/started',
						},
					],
				},
				{
					text: '工具',
					items: [
						{
							text: 'add 加法',
							link: '/utils/add',
						},
						{
							text: 'raf 动画帧',
							link: '/utils/animation-frame',
						},
						{
							text: 'date 日期格式化',
							link: '/utils/date-format',
						},
						{
							text: 'debounce 防抖',
							link: '/utils/debounce',
						},
						{
							text: 'downloadFile 下载文件',
							link: '/utils/download-file',
						},
						{
							text: 'moneyFormat 金额格式化',
							link: '/utils/money-format',
						},
						{
							text: 'raf 定时器',
							link: '/utils/raf-timeout',
						},
						{
							text: 'throttle 节流',
							link: '/utils/throttle',
						},
					],
				},
			],
		},
	},
});
