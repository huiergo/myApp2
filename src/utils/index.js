import Taro from '@tarojs/taro';

export function setStorage(key, value) {
  Taro.setStorageSync(key, value);
}

export function getStorage(key) {
  return Taro.getStorageSync(key);
}

export function removeAndAppendItemToStorage(key, index, item) {
  console.log('removeAndAppendItemToStorage 入参是----', key, index, item);
  let arr = getStorage(key);
  console.log('getstory 的值是----', arr);
  let newArr = arr.splice(index, 1).concat(item);
  setStorage(key, newArr);
  return newArr;
}

export function removeItemFromStorage(key, index) {
  console.log('[[removeItemFromStorage 入参----', key, index);
  let arr = getStorage(key);

  arr.splice(index, 1);

  setStorage(key, arr);
  return arr;
}

export function deleteFromStorage(key) {
  setStorage(key, []);
  return [];
}
