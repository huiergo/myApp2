import Taro from '@tarojs/taro';
import store from '../store/index';

export function setStorage(key, value) {
  Taro.setStorageSync(key, value);
}

export function getStorage(key) {
  return Taro.getStorageSync(key);
}

export function removeAndAppendItemToStorage(key, item) {
  let arr = getStorage(key);
  arr.unshift(item);
  let newArr = Array.from(new Set(arr));
  setStorage(key, newArr);
  return newArr;
}

export function removeItemFromStorage(key, index) {
  let arr = getStorage(key);
  arr.splice(index, 1);
  setStorage(key, arr);
  return arr;
}

export function deleteFromStorage(key) {
  setStorage(key, []);
  return [];
}

export function gotoPage({ url }) {
  return Taro.navigateTo({ url });
}

export function redirectToPage({ url }) {
  return Taro.redirectTo({ url });
}

// 按钮点击拦截装饰器
export function loggingDecorator(fn = () => {}) {
  let { nickName } = store.getState().common.userInfo;
  if (!nickName) return gotoPage({ url: '../../sub/login/index' });
  fn.apply(this);
  console.log('执行完成');
}

export const throttle = (fn, delay, mustRunDelay) => {
  let timer;
  let startTime;
  return (...args) => {
    const curTime = Date.now();
    clearTimeout(timer);
    if (!startTime) {
      startTime = curTime;
    }
    if (curTime - startTime >= mustRunDelay) {
      fn.apply(this, args);
      startTime = curTime;
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    }
  };
};

// // 防抖
// function debounce(fn, delay = 300) {
//   //默认300毫秒
//   let timer;
//   return function () {
//     const args = arguments;
//     if (timer) {
//       clearTimeout(timer);
//     }
//     timer = setTimeout(() => {
//       fn.apply(this, args); // 改变this指向为调用debounce所指的对象
//     }, delay);
//   };
// }

// // 节流
// // 设置一个标志
// function throttle(fn, delay) {
//   let flag = true;
//   return () => {
//     if (!flag) return;
//     flag = false;
//     timer = setTimeout(() => {
//       fn();
//       flag = true;
//     }, delay);
//   };
// }
