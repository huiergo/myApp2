import { handleActions as createReducer } from 'redux-actions';
import { changeTab, saveInitData, saveLoadMore } from '../actions/experience.action';

const initialState = {
  recommend: {
    des: '推荐',
    list: [
      {
        difficulty: 1,
        title: '推荐1-Question的优势是什么？',
        likeNum: 666,
        pvNum: 99,
        isLike: true,
      },
      {
        difficulty: 1,
        title: '推荐2-Question的优势是什么？',
        likeNum: 666,
        pvNum: 99,
        isLike: true,
      },
      {
        difficulty: 1,
        title: '推荐1-Question的优势是什么？',
        likeNum: 666,
        pvNum: 99,
        isLike: true,
      },
      {
        difficulty: 1,
        title: '推荐2-Question的优势是什么？',
        likeNum: 666,
        pvNum: 99,
        isLike: true,
      },
      {
        difficulty: 1,
        title: '推荐1-Question的优势是什么？',
        likeNum: 666,
        pvNum: 99,
        isLike: true,
      },
      {
        difficulty: 1,
        title: '推荐2-Question的优势是什么？',
        likeNum: 666,
        pvNum: 99,
        isLike: true,
      },
      {
        difficulty: 1,
        title: '推荐1-Question的优势是什么？',
        likeNum: 666,
        pvNum: 99,
        isLike: true,
      },
      {
        difficulty: 1,
        title: '推荐2-Question的优势是什么？',
        likeNum: 666,
        pvNum: 99,
        isLike: true,
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
        likeNum: 666,
        pvNum: 99,
        isLike: true,
      },
      {
        difficulty: 1,
        title: '最新2-Question的优势是什么？',
        likeNum: 666,
        pvNum: 99,
        isLike: true,
      },
      {
        difficulty: 1,
        title: '最新1-Question的优势是什么？',
        likeNum: 666,
        pvNum: 99,
        isLike: true,
      },
      {
        difficulty: 1,
        title: '最新2-Question的优势是什么？',
        likeNum: 666,
        pvNum: 99,
        isLike: true,
      },
      {
        difficulty: 1,
        title: '最新1-Question的优势是什么？',
        likeNum: 666,
        pvNum: 99,
        isLike: true,
      },
      {
        difficulty: 1,
        title: '最新2-Question的优势是什么？',
        likeNum: 666,
        pvNum: 99,
        isLike: true,
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
  const { tabType, list, page } = action.payload;
  return {
    ...state,
    [tabType]: {
      ...state[tabType],
      list,
      page,
    },
  };
};

const handleSaveLoadMore = (state, action) => {
  const { tabType, list, page } = action.payload;

  return {
    ...state,
    [tabType]: {
      ...state[tabType],
      list: state[tabType].list.concat(list),
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
