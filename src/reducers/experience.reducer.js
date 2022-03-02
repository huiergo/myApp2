import { handleActions as createReducer } from 'redux-actions';
import { changeTab, saveInitData, saveLoadMore } from '../actions/experience.action';

const initialState = {
  recommend: {
    des: '推荐',
    list: [
      {
        difficulty: 1,
        title: '推荐1-Question的优势是什么？',
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
      {
        difficulty: 1,
        title: '推荐2-Question的优势是什么？',
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
      {
        difficulty: 1,
        title: '推荐1-Question的优势是什么？',
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
      {
        difficulty: 1,
        title: '推荐2-Question的优势是什么？',
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
      {
        difficulty: 1,
        title: '推荐1-Question的优势是什么？',
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
      {
        difficulty: 1,
        title: '推荐2-Question的优势是什么？',
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
      {
        difficulty: 1,
        title: '推荐1-Question的优势是什么？',
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
      {
        difficulty: 1,
        title: '推荐2-Question的优势是什么？',
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
    ],
    page: 1,
    pageSize: 20,
  },
  latest: {
    des: '最新',
    list: [
      {
        difficulty: 1,
        title: '最新1-Question的优势是什么？',
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
      {
        difficulty: 1,
        title: '最新2-Question的优势是什么？',
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
      {
        difficulty: 1,
        title: '最新1-Question的优势是什么？',
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
      {
        difficulty: 1,
        title: '最新2-Question的优势是什么？',
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
      {
        difficulty: 1,
        title: '最新1-Question的优势是什么？',
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
      {
        difficulty: 1,
        title: '最新2-Question的优势是什么？',
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
