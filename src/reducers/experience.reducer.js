import { handleActions as createReducer } from 'redux-actions';
import { changeTab, saveInitData, saveLoadMore, saveLoading } from '../actions/experience.action';

const initialState = {
  recommend: {
    des: '推荐',
    list: [],
    page: 1,
    pageSize: 20,
  },
  latest: {
    des: '最新',
    list: [],
    page: 1,
    pageSize: 20,
  },
  currentIdx: 0,
};

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
  console.log('去你大爷的。。。。');
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
export default createReducer(
  {
    [changeTab]: handleChangeTab,
    [saveInitData]: handleSaveInitData, // 因为有刷新
    [saveLoadMore]: handleSaveLoadMore,
    [saveLoading]: handleSaveLoading,
  },
  initialState,
);
