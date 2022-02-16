// 点击记录： 本地处理，最近点击的需要放在数组最前面
// 搜索记录： 本地处理，就算网络异常也是要放在数组最前面
// 删除记录：

import Taro from '@tarojs/taro';
import { getJSON } from '../services/method';
import apis from '../services/apis';
import {
  removeAndAppendItemToStorage,
  removeItemFromStorage,
  deleteFromStorage,
  getStorage,
  setStorage,
} from '../utils/index';

let mock = [
  { type: 'all', title: '全部' },
  { type: 'React', title: 'React' },
  { type: 'Vue', title: 'Vue' },
];

export function initRecord(params) {
  console.log('initRecord 的值是---', params);
  setStorage('recordList', params);
  return (dispatch) => {
    dispatch({
      type: 'updateRecordList',
      recordList: params,
    });
  };
}

// 搜索记录  getSearchHistory
export function getSearchHistory() {
  const temp = getStorage('recordList');
  return (dispatch) => {
    dispatch({
      type: 'updateRecordList',
      recordList: temp,
    });
  };
}

export function edit() {
  return {
    type: 'edit',
  };
}

export function quitEdit() {
  return {
    type: 'quitEdit',
  };
}

export function deleteAll() {
  const temp = deleteFromStorage('recordList');
  return async (dispatch) => {
    await dispatch({
      type: 'deleteAll',
      recordList: temp,
    });
  };
}

export function searchItem(item) {
  const temp = removeAndAppendItemToStorage('recordList', item);
  return (dispatch) => {
    dispatch({
      type: 'searchItem',
      recordList: temp, //result.data.data,
    });
  };
}

export function deleItem(index) {
  const temp = removeItemFromStorage('recordList', index);
  return (dispatch) => {
    dispatch({
      type: 'deleItem',
      recordList: temp,
    });
  };
}
