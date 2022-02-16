import Taro from '@tarojs/taro';

export function setStorage(key, value) {
  Taro.setStorageSync(key, value);
}

export function getStorage(key) {
  return Taro.getStorageSync(key);
}

export function removeAndAppendItemToStorage(key, index, item) {
  let arr = getStorage(key);
  arr.splice(index, 1);
  arr.unshift(item);
  setStorage(key, arr);
  return arr;
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
