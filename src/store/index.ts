/*
 * @Descripttion:
 * @version:
 * @Author: 陶帅星
 * @Date: 2023-07-07 14:12:56
 * @LastEditors: 陶帅星
 * @LastEditTime: 2023-07-07 14:33:27
 */
import { defineStore } from 'pinia';
export const useMainStore = defineStore('main', {
	state: () => {
		return {
			lang: 'CN',
		};
	},
	getters: {
		getLang: (state) => {
			return state.lang;
		},
	},
});
