import Taro from '@tarojs/taro';
import { getJSON, postJSON } from '../services/method';
import apis from '../services/apis';
import { takeEvery, put } from 'redux-saga/effects';
import {
  initData,
  loadMore,
  saveInitData,
  saveLoadMore,
  category,
  saveCategory,
} from '../actions/first.action';
import { saveCategoryToTag } from '../actions/tag.action';

/**
 * 获取”初始化“列表，并同步到store
 */
function* handleInitData({ payload }) {
  const { tabType, page } = payload;
  let result = yield getJSON(apis.getRecommendList, { page });
  console.log('初始化数据-----', result);
  if (result && result.data && result.data.data) {
    let list = result.data.data.rows;
    yield put(saveInitData({ tabType, list, page }));
  }
}

/**
 * 获取”更多“列表，并同步到store
 */
function* handleLoadMore({ payload }) {
  console.log('first handleLoadMore=====', payload);
  const { tabType, page } = payload;
  console.log('before结果是不是没有=====', tabType, page);

  let list = [
    {
      difficulty: 1,
      title: '加载更多Question的优势是什么？' + tabType,
      likeCount: 666,
      views: 99,
      likeFlag: true,
    },
    {
      difficulty: 2,
      title: '加载更多Question的优势是什么？' + tabType,
      likeCount: 666,
      views: 99,
      likeFlag: true,
    },
    {
      difficulty: 0,
      title: '加载更多Question的优势是什么？' + tabType,
      likeCount: 666,
      views: 99,
      likeFlag: true,
    },
    {
      difficulty: 1,
      title: '加载更多Question的优势是什么？',
      likeCount: 666,
      views: 99,
      likeFlag: true,
    },
    {
      difficulty: 1,
      title: '加载更多Question的优势是什么？' + tabType,
      likeCount: 666,
      views: 99,
      likeFlag: true,
    },
    {
      difficulty: 1,
      title: '加载更多Question的优势是什么？' + tabType,
      likeCount: 666,
      views: 99,
      likeFlag: true,
    },
  ];
  console.log('put first save loadmore=====', tabType, list, page);
  yield put(saveLoadMore({ tabType, list, page }));
  // }
}

/**
 * 获取分类
 */
function* handleCategory() {
  let result = yield getJSON(apis.getCategory);
  if (result && result.data && result.data.data) {
    let cateList = result.data.data;
    yield put(saveCategory({ cateList }));
    yield put(saveCategoryToTag({ cateList }));
  }
}

export default function* experienceSaga() {
  yield takeEvery(initData, handleInitData);
  yield takeEvery(loadMore, handleLoadMore);
  yield takeEvery(category, handleCategory);
}
