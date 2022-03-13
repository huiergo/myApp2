import { handleActions as createReducer } from 'redux-actions';
import { changeTab, saveInitData, saveLoadMore, saveLoading } from '../actions/sub_zan.action';

const initialState = {
  sub_zan_question: {
    des: '题目',
    list: [
      {
        difficulty: 1,
        title: 'zan  题目1-Question的优势是什么？',
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
      {
        difficulty: 1,
        title: 'zan  题目2-Question的优势是什么？',
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
      {
        difficulty: 1,
        title: 'zan  题目1-Question的优势是什么？',
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
      {
        difficulty: 1,
        title: 'zan  题目2-Question的优势是什么？',
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
      {
        difficulty: 1,
        title: 'zan  题目1-Question的优势是什么？',
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
      {
        difficulty: 1,
        title: 'zan  题目2-Question的优势是什么？',
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
      {
        difficulty: 1,
        title: 'zan  题目1-Question的优势是什么？',
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
      {
        difficulty: 1,
        title: 'zan  题目2-Question的优势是什么？',
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
    ],
    page: 1,
    pageSize: 20,
  },
  sub_zan_experience: {
    des: '面经',
    list: [
      {
        difficulty: 1,
        title: 'zan  题目1-Question的优势是什么？',
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
      {
        difficulty: 1,
        title: 'zan  题目2-Question的优势是什么？',
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
      {
        difficulty: 1,
        title: 'zan  题目1-Question的优势是什么？',
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
      {
        difficulty: 1,
        title: 'zan  题目2-Question的优势是什么？',
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
      {
        difficulty: 1,
        title: 'zan  题目1-Question的优势是什么？',
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
      {
        difficulty: 1,
        title: 'zan  题目2-Question的优势是什么？',
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
    ],
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
  const { type, list, page } = action.payload;
  return {
    ...state,
    [type]: {
      ...state[type],
      list,
      page,
      loading: false,
    },
  };
};

const handleSaveLoadMore = (state, action) => {
  const { type, list, page } = action.payload;
  console.log('去你大爷的。。。。');
  return {
    ...state,
    [type]: {
      ...state[type],
      list: state[type].list.concat(list),
      page,
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
