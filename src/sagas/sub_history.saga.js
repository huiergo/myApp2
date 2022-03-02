import Taro from '@tarojs/taro';
import { getJSON, postJSON } from '../services/method';
import apis from '../services/apis';
import { takeEvery, put } from 'redux-saga/effects';
import { initData, loadMore, saveInitData, saveLoadMore } from '../actions/sub_history.action';

/**
 * 获取”初始化“列表，并同步到store
 */
function* handleInitData({ payload }) {
  const { type, page } = payload;
  let result = yield getJSON(apis.getRecommendList, { page });
  if (result && result.data && result.data.data) {
    let list = [
      {
        difficulty: 1,
        title: '初始化Question的优势是什么？' + type,
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
      {
        difficulty: 2,
        title: '初始化Question的优势是什么？' + type,
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
      {
        difficulty: 0,
        title: '初始化Question的优势是什么？' + type,
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
      {
        difficulty: 1,
        title: '初始化Question的优势是什么？' + type,
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
      {
        difficulty: 1,
        title: '初始化Question的优势是什么？' + type,
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
      {
        difficulty: 1,
        title: '初始化Question的优势是什么？' + type,
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
    ];
    yield put(saveInitData({ type, list, page }));
  }
}

/**
 * 获取”更多“列表，并同步到store
 */
function* handleLoadMore({ payload }) {
  const { type, page } = payload;

  let result = yield getJSON(apis.getRecommendList, { page });
  if (result && result.data && result.data.data) {
    let list = [
      {
        difficulty: 1,
        title: '加载更多Question的优势是什么？' + type,
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
      {
        difficulty: 2,
        title: '加载更多Question的优势是什么？' + type,
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
      {
        difficulty: 0,
        title: '加载更多Question的优势是什么？' + type,
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
        title: '加载更多Question的优势是什么？' + type,
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
      {
        difficulty: 1,
        title: '加载更多Question的优势是什么？' + type,
        likeCount: 666,
        views: 99,
        likeFlag: true,
      },
    ];
    yield put(saveLoadMore({ type, list, page }));
  }
}
export default function* () {
  yield takeEvery(initData, handleInitData);
  yield takeEvery(loadMore, handleLoadMore);
}
