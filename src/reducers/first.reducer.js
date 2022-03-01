import { handleActions as createReducer } from 'redux-actions';
import {
  submitFilterParams,
  triggerModel,
  // 以下为列表
  changeTab,
  saveInitData,
  saveLoadMore,
  saveCategory,
} from '../actions/first.action';

const initialState = {
  extraParams: {},
  // 以下是tab列表相关，将来会抽离
  currentIdx: 0,
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
  console.log(2222, action);
  const { tabType, list, page } = action.payload;

  console.log('11111  first  action====', action);
  return {
    ...state,
    [tabType]: {
      ...state[tabType],
      list: state[tabType].list.concat(list),
      page,
    },
  };
};
// [
//   {
//     "id": 350000197511154900,
//     "name": "韩艳"
//   {
//     "id": 460000201203274700,
//     "name": "李霞"
//   }
// ]
// ===============
// recommend: {
//   des: '推荐',
//   list: [],
//   page: 1,
//   pageSize: 20,
// },
// latest: {
//   des: '最新',
//   list: [],
//   page: 1,
//   pageSize: 20,
// },
const buildCateData = (list) => {
  let obj = {};
  list.map((item) => {
    obj[item.id] = {
      des: item.name,
      list: [],
      page: 1,
      pageSize: 20,
    };
  });
  console.log('[buildCateData result-----]', obj);
  return obj;
};

const handelSaveCategory = (state, action) => {
  const { cateList } = action.payload;
  console.log('[handelSaveCategory-----]', cateList);
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
    // 分类
    [saveCategory]: handelSaveCategory,
  },
  initialState,
);
