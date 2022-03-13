import Taro from '@tarojs/taro';
import { takeEvery, put } from 'redux-saga/effects';
import { getJSON, postJSON } from '../services/method';
import apis from '../services/apis';
import {
  initSearchData,
  loadSearchMore,
  saveInitSearchData,
  saveLoadSearchMore,
  saveLoading,
} from '../actions/search.action';

/**
 * 获取”初始化“搜索列表，并同步到store
 */
function* handleInitSearchData({ payload }) {
  const { keyword, page, questionBankType } = payload;
  yield put(saveLoading({ loading: true }));

  let result = yield getJSON({
    url: apis.getQuestionList,
    data: { keyword, page, questionBankType, type: 0 },
  });

  let { pageTotal, rows: list } = result;
  yield put(saveInitSearchData({ list, page, pageTotal }));
  yield put(saveLoading({ loading: false }));
}

/**
 * 获取”更多“搜索列表，并同步到store
 */
function* handleLoadSearchMore({ payload }) {
  const { keyword, page, questionBankType } = payload;
  console.log('[handleLoadSearchMore  payload-----]', payload);
  yield put(saveLoading({ loading: true }));

  let result = yield getJSON({
    url: apis.getQuestionList,
    data: { keyword, page, questionBankType, type: 0 },
  });
  let { pageTotal, rows: list } = result;
  yield put(saveLoadSearchMore({ type: 0, list, page, pageTotal }));
  yield put(saveLoading({ loading: false }));
}

export default function* searchSaga() {
  yield takeEvery(initSearchData, handleInitSearchData);
  yield takeEvery(loadSearchMore, handleLoadSearchMore);
}
