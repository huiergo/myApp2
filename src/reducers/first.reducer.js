import { handleActions as createReducer } from 'redux-actions';
import {
  submitFilterParams,
  triggerModel,
  // 以下为列表
  changeTab,
  saveInitData,
  saveLoadMore,
  saveCategory,
  saveLoading,
} from '../actions/first.action';

const initialState = {
  extraParams: {},
  // 以下是tab列表相关，将来会抽离
  currentIdx: 0,
};

const handleSubmitFilterParams = (state, action) => {
  return {
    ...state,
    extraParams: { ...state.extraParams, ...action.payload },
  };
};

const handleTrigger = (state, action) => {
  const value = action.payload;
  return {
    ...state,
    showModal: value,
  };
};
// 以下是tab列表相关

const handleChangeTab = (state, action) => {
  return {
    ...state,
    currentIdx: action.payload,
  };
};

const handleSaveInitData = (state, action) => {
  const { type, list, page, pageTotal } = action.payload;
  return {
    ...state,
    [type]: {
      ...state[type],
      list,
      page,
      pageTotal,
      loading: false,
    },
  };
};

const handleSaveLoadMore = (state, action) => {
  const { type, list, page, pageTotal } = action.payload;

  return {
    ...state,
    [type]: {
      ...state[type],
      list: state[type].list.concat(list),
      page,
      pageTotal,
      loading: false,
    },
  };
};

const handleSaveLoading = (state, action) => {
  const { type, loading } = action.payload;
  console.log('[save loading-------]', type, loading);
  return {
    ...state,
    [type]: {
      ...state[type],
      loading: loading,
    },
  };
};

const buildCateData = (list) => {
  let obj = {};
  list.map((item, index) => {
    let key = index + '_' + item.id;
    let value = {
      des: item.name,
      list: [],
      page: 1,
      pageSize: 20,
      loading: false,
    };
    obj[key] = value;
  });
  return obj;
};

const handelSaveCategory = (state, action) => {
  const { cateList } = action.payload;
  return {
    ...state,
    ...buildCateData(cateList),
  };
};

export default createReducer(
  {
    [submitFilterParams]: handleSubmitFilterParams,
    [triggerModel]: handleTrigger,
    // 以下是tab列表相关
    [changeTab]: handleChangeTab,
    [saveInitData]: handleSaveInitData, // 因为有刷新
    [saveLoadMore]: handleSaveLoadMore,
    [saveLoading]: handleSaveLoading,
    // 分类
    [saveCategory]: handelSaveCategory,
  },
  initialState,
);
