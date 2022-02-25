import Taro from '@tarojs/taro';

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

export function gotoSearchPage(url) {
  return Taro.navigateTo({ url });
}
