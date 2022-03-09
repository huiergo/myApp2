import { handleActions as createReducer } from 'redux-actions';
import Taro from '@tarojs/taro';
import {
  clearAllRecordList,
  deleteRecordByIndex,
  editTrigger,
  unShiftRecord,
  saveInitSearchData,
  saveLoadSearchMore,
  inputTrigger,
} from '../actions/search.action';

let storage_record = Taro.getStorageSync('storage_record_list');
console.log('[init storage_record---]', storage_record);
const initialState = {
  recordList: storage_record || [],
  isEdit: false,
  page: 1,
  list: [], //搜索结果列表
  hasInput: false,
};
const handleUnShiftRecord = (state, action) => {
  // todo: 需要remove, 然后unshift
  const { item } = action.payload;
  let index = state.recordList.indexOf(item);
  if (index > -1) {
    state.recordList.splice(index, 1);
  }
  state.recordList.unshift(item);
  Taro.setStorageSync('storage_record_list', [...state.recordList]);

  return {
    ...state,
    recordList: [...state.recordList],
  };
};

const handleClearAllRecordList = (state, action) => {
  Taro.setStorageSync('storage_record_list', []);

  return {
    ...state,
    recordList: [],
  };
};

const handleDeleteRecordByIndex = (state, action) => {
  const index = action.payload;
  // todo: 换一种方式
  state.recordList.splice(index, 1);
  Taro.setStorageSync('storage_record_list', [...state.recordList]);

  return {
    ...state,
    recordList: [...state.recordList],
  };
};

const handleEditTrigger = (state, action) => {
  const isEdit = action.payload;
  return {
    ...state,
    isEdit,
  };
};

const handleSaveInitSearchData = (state, action) => {
  const { list, page, pageTotal } = action.payload;
  return {
    ...state,
    list,
    page,
    pageTotal,
  };
};

const handleSaveLoadSearchMore = (state, action) => {
  const { list, page, pageTotal } = action.payload;
  return {
    ...state,
    list: state.list.concat(list),
    page,
    pageTotal,
  };
};

const handleInputTrigger = (state, action) => {
  const value = action.payload;
  console.log('[handleInputTrigger-----]', value);
  return {
    ...state,
    hasInput: value ? true : false,
  };
};

export default createReducer(
  {
    [clearAllRecordList]: handleClearAllRecordList,
    [deleteRecordByIndex]: handleDeleteRecordByIndex,
    [unShiftRecord]: handleUnShiftRecord,
    [editTrigger]: handleEditTrigger,
    [saveInitSearchData]: handleSaveInitSearchData,
    [saveLoadSearchMore]: handleSaveLoadSearchMore,
    [inputTrigger]: handleInputTrigger,
  },
  initialState,
);
