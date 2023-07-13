/*
 * @Descripttion:
 * @version:
 * @Author: 陶帅星
 * @Date: 2023-07-07 14:12:56
 * @LastEditors: 陶帅星
 * @LastEditTime: 2023-07-11 10:02:06
 */
import { defineStore } from 'pinia'
export const useStore = defineStore('main', {
  state: () => {
    return {
      tabIndex: sessionStorage.getItem('tabIndex'),
    }
  },
  getters: {
    getTabIndex: state => {
      return state.tabIndex
    },
  },
})
