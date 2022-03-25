import { handleActions as createReducer } from 'redux-actions';
import { changeTab, saveInitData, saveLoadMore, saveLoading } from '../actions/favorite.action';

const initialState = {
  favorite_question: {
    des: '题目',
    list: [],
    page: 1,
    pageSize: 20,
  },
  favorite_experience: {
    des: '面经',
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
