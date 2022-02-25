import Taro from '@tarojs/taro';
import { takeEvery, put } from 'redux-saga/effects';
import { getJSON, postJSON } from '../services/method';
import apis from '../services/apis';
import {
  initSearchData,
  loadSearchMore,
  saveInitSearchData,
  saveLoadSearchMore,
} from '../actions/search.action';

/**
 * 获取”初始化“搜索列表，并同步到store
 */
function* handleInitSearchData({ payload }) {
  const { page } = payload;
  let result = yield getJSON(apis.getRecommendList, { page });
  if (result && result.data && result.data.data) {
    let list = [
      {
        difficulty: 1,
        title: '初始化Search的优势是什么？',
        likeNum: 666,
        pvNum: 99,
        isLike: true,
      },
      {
        difficulty: 2,
        title: '初始化Search的优势是什么？',
        likeNum: 666,
        pvNum: 99,
        isLike: true,
      },
      {
        difficulty: 0,
        title: '初始化Search的优势是什么？',
        likeNum: 666,
        pvNum: 99,
        isLike: true,
      },
      {
        difficulty: 1,
        title: '初始化Search的优势是什么？',
        likeNum: 666,
        pvNum: 99,
        isLike: true,
      },
      {
        difficulty: 1,
        title: '初始化Search的优势是什么？',
        likeNum: 666,
        pvNum: 99,
        isLike: true,
      },
      {
        difficulty: 1,
        title: '初始化Search的优势是什么？',
        likeNum: 666,
        pvNum: 99,
        isLike: true,
      },
    ];
    yield put(saveInitSearchData({ list, page }));
  }
}

/**
 * 获取”更多“搜索列表，并同步到store
 */
function* handleLoadSearchMore({ payload }) {
  const { page } = payload;
  let result = yield getJSON(apis.getRecommendList, { page });
  if (result && result.data && result.data.data) {
    let list = [
      {
        difficulty: 1,
        title: '加载更多Search的优势是什么？',
        likeNum: 666,
        pvNum: 99,
        isLike: true,
      },
      {
        difficulty: 2,
        title: '加载更多Search的优势是什么？',
        likeNum: 666,
        pvNum: 99,
        isLike: true,
      },
      {
        difficulty: 0,
        title: '加载更多Search的优势是什么？',
        likeNum: 666,
        pvNum: 99,
        isLike: true,
      },
      {
        difficulty: 1,
        title: '加载更多Search的优势是什么？',
        likeNum: 666,
        pvNum: 99,
        isLike: true,
      },
      {
        difficulty: 1,
        title: '加载更多Search的优势是什么？',
        likeNum: 666,
        pvNum: 99,
        isLike: true,
      },
      {
        difficulty: 1,
        title: '加载更多Search的优势是什么？',
        likeNum: 666,
        pvNum: 99,
        isLike: true,
      },
    ];
    yield put(saveLoadSearchMore({ list, page }));
  }
}

export default function* searchSaga() {
  yield takeEvery(initSearchData, handleInitSearchData);
  yield takeEvery(loadSearchMore, handleLoadSearchMore);
}
