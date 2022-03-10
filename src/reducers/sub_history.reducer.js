import { handleActions as createReducer } from 'redux-actions';
import { changeTab, saveInitData, saveLoadMore } from '../actions/sub_history.action';

const initialState = {
  history_question: {
    des: '题目',
    list: [],
    page: 1,
    pageSize: 20,
  },
  history_experience: {
    des: '面经',
    list: [],
    page: 1,
    pageSize: 20,
  },
  currentIdx: 0,
  optType: 0,
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
    },
  };
};

export default createReducer(
  {
    [changeTab]: handleChangeTab,
    [saveInitData]: handleSaveInitData, // 因为有刷新
    [saveLoadMore]: handleSaveLoadMore,
  },
  initialState,
);
