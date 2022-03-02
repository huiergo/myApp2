import Taro from '@tarojs/taro';
import { getJSON, postJSON } from '../services/method';
import apis from '../services/apis';
import { takeEvery, put } from 'redux-saga/effects';
import { initData, loadMore, saveInitData, saveLoadMore } from '../actions/sub_zan.action';

/**
 * 获取”初始化“列表，并同步到store
 */
function* handleInitData({ payload }) {
  const { tabType, page } = payload;
  let result = yield getJSON(apis.getRecommendList, { page });
  if (result && result.data && result.data.data) {
    let list = [
      {
        difficulty: 1,
        title: '初始化Question的优势是什么？' + tabType,
        likeCount: 666,
        views: 99,
        isLike: true,
      },
      {
        difficulty: 2,
        title: '初始化Question的优势是什么？' + tabType,
        likeCount: 666,
        views: 99,
        isLike: true,
      },
      {
        difficulty: 0,
        title: '初始化Question的优势是什么？' + tabType,
        likeCount: 666,
        views: 99,
        isLike: true,
      },
      {
        difficulty: 1,
        title: '初始化Question的优势是什么？' + tabType,
        likeCount: 666,
        views: 99,
        isLike: true,
      },
      {
        difficulty: 1,
        title: '初始化Question的优势是什么？' + tabType,
        likeCount: 666,
        views: 99,
        isLike: true,
      },
      {
        difficulty: 1,
        title: '初始化Question的优势是什么？' + tabType,
        likeCount: 666,
        views: 99,
        isLike: true,
      },
    ];
    yield put(saveInitData({ tabType, list, page }));
  }
}

/**
 * 获取”更多“列表，并同步到store
 */
function* handleLoadMore({ payload }) {
  const { tabType, page } = payload;

  let result = yield getJSON(apis.getRecommendList, { page });
  if (result && result.data && result.data.data) {
    let list = [
      {
        difficulty: 1,
        title: '加载更多Question的优势是什么？' + tabType,
        likeCount: 666,
        views: 99,
        isLike: true,
      },
      {
        difficulty: 2,
        title: '加载更多Question的优势是什么？' + tabType,
        likeCount: 666,
        views: 99,
        isLike: true,
      },
      {
        difficulty: 0,
        title: '加载更多Question的优势是什么？' + tabType,
        likeCount: 666,
        views: 99,
        isLike: true,
      },
      {
        difficulty: 1,
        title: '加载更多Question的优势是什么？',
        likeCount: 666,
        views: 99,
        isLike: true,
      },
      {
        difficulty: 1,
        title: '加载更多Question的优势是什么？' + tabType,
        likeCount: 666,
        views: 99,
        isLike: true,
      },
      {
        difficulty: 1,
        title: '加载更多Question的优势是什么？' + tabType,
        likeCount: 666,
        views: 99,
        isLike: true,
      },
    ];
    yield put(saveLoadMore({ tabType, list, page }));
  }
}
export default function* () {
  yield takeEvery(initData, handleInitData);
  yield takeEvery(loadMore, handleLoadMore);
}
