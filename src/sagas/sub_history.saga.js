import Taro from '@tarojs/taro';
import { getJSON, postJSON } from '../services/method';
import apis from '../services/apis';
import { takeEvery, put } from 'redux-saga/effects';
import {
  initData,
  loadMore,
  saveInitData,
  saveLoadMore,
  saveLoading,
} from '../actions/sub_history.action';

/**
 * 获取”初始化“列表，并同步到store
 */

function* handleInitData({ payload }) {
  // todo: 需要传递 optType 1点赞2收藏3浏览
  console.log('todo: 需要传递 optType 1点赞2收藏3浏览----', payload);
  const { type, page, questionBankType, optType } = payload;
  yield put(saveLoading({ type, loading: true }));
  Taro.showLoading({
    title: '加载中...',
  });
  let result = yield getJSON({
    url: apis.getOptList,
    data: { page, type, questionBankType, optType },
  });

  let { pageTotal, rows: list } = result;
  yield put(saveInitData({ type, list, page, pageTotal }));
  yield put(saveLoading({ type, loading: false }));
  Taro.hideLoading();
}

/**
 * 获取”更多“列表，并同步到store
 */
function* handleLoadMore({ payload }) {
  const { type, page, questionBankType, optType } = payload;
  yield put(saveLoading({ type, loading: true }));
  Taro.showLoading({
    title: '加载中...',
  });
  let result = yield getJSON({
    url: apis.getOptList,
    data: { page, type, questionBankType, optType },
  });
  let { pageTotal, rows: list } = result;

  yield put(saveLoadMore({ type, list, page, pageTotal }));
  yield put(saveLoading({ type, loading: false }));
  Taro.hideLoading();
}

export default function* () {
  yield takeEvery(initData, handleInitData);
  yield takeEvery(loadMore, handleLoadMore);
}
