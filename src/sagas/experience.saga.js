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
} from '../actions/experience.action';

/**
 * 获取”初始化“列表，并同步到store
 */
function* handleInitData({ payload }) {
  const { type, page, current, index } = payload;
  console.log(' current, index ==========', current, index);
  // let api = current === 0 ? apis.getRecommendList : apis.getQuestionList;

  let api = apis.getQuestionList;
  let params = current === 0 ? { sort: 30 } : {};
  // questionBankType:9 面经
  yield put(saveLoading({ type, loading: true }));
  Taro.showLoading({
    title: '加载中...',
  });
  let result = yield getJSON({ url: api, data: { page, questionBankType: 9, ...params } });
  let { pageTotal, rows: list } = result;
  yield put(saveInitData({ type, list, page, pageTotal }));
  yield put(saveLoading({ type, loading: false }));
  Taro.hideLoading();
}

/**
 * 获取”更多“列表，并同步到store
 */
function* handleLoadMore({ payload }) {
  const { type, page, current, index } = payload;
  let api = apis.getQuestionList;
  let params = current === 0 ? { sort: 30 } : {};
  // questionBankType:9 面经
  yield put(saveLoading({ type, loading: true }));
  Taro.showLoading({
    title: '加载中...',
  });
  let result = yield getJSON({ url: api, data: { page, questionBankType: 9, ...params } });
  let { pageTotal, rows: list } = result;
  yield put(saveLoadMore({ type, list, page, pageTotal }));
  yield put(saveLoading({ type, loading: false }));
  Taro.hideLoading();
}
export default function* experienceSaga() {
  yield takeEvery(initData, handleInitData);
  yield takeEvery(loadMore, handleLoadMore);
}
