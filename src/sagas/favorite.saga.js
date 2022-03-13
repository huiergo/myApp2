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
} from '../actions/favorite.action';

/**
 * 获取”初始化“列表，并同步到store
 */

function* handleInitData({ payload }) {
  // todo: 需要传递 optType 1点赞2收藏3浏览
  const { type, page, questionBankType, optType = 2 } = payload;
  yield put(saveLoading({ type, loading: true }));
  let result = yield getJSON({
    url: apis.getOptList,
    data: { page, type, questionBankType, optType },
  });
  let { pageTotal, rows: list } = result;
  yield put(saveInitData({ type, list, page, pageTotal }));
  yield put(saveLoading({ type, loading: false }));
}

/**
 * 获取”更多“列表，并同步到store
 */
function* handleLoadMore({ payload }) {
  const { type, page, questionBankType, optType = 2 } = payload;
  yield put(saveLoading({ type, loading: true }));

  let result = yield getJSON({
    url: apis.getOptList,
    data: { page, type, questionBankType, optType },
  });
  let { pageTotal, rows: list } = result;
  yield put(saveLoadMore({ type, list, page, pageTotal }));
  yield put(saveLoading({ type, loading: false }));
}

export default function* experienceSaga() {
  yield takeEvery(initData, handleInitData);
  yield takeEvery(loadMore, handleLoadMore);
}
