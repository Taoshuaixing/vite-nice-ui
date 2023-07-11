/*
 * @Descripttion:
 * @version:
 * @Author: 陶帅星
 * @Date: 2023-07-11 10:20:21
 * @LastEditors: 陶帅星
 * @LastEditTime: 2023-07-11 10:23:43
 */
export const dispatchEventStroage: any = () => {
	const signSetItem: any = sessionStorage.setItem;
	sessionStorage.setItem = function (key, val) {
		let setEvent: any = new Event('setItemEvent');
		setEvent.key = key;
		setEvent.newValue = val;
		window.dispatchEvent(setEvent);
		signSetItem.apply(this, arguments);
	};
};
