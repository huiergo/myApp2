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
  const { keyword, page, questionBankType } = payload;
  let result = yield getJSON(apis.getQuestionList, { keyword, page, questionBankType, type: 0 });

  if (result && result.data && result.data.data) {
    let pageTotal = result.data.data.pageTotal;
    let list = result.data.data.rows;
    yield put(saveInitSearchData({ list, page, pageTotal }));
  }
}

/**
 * 获取”更多“搜索列表，并同步到store
 */
function* handleLoadSearchMore({ payload }) {
  const { keyword, page, questionBankType } = payload;
  console.log('[handleLoadSearchMore  payload-----]', payload);

  let result = yield getJSON(apis.getQuestionList, { keyword, page, questionBankType, type: 0 });
  console.log('[handleLoadSearchMore  result-----]', result);
  let pageTotal = result.data.data.pageTotal;
  let list = result.data.data.rows;
  yield put(saveLoadSearchMore({ type: 0, list, page, pageTotal }));
}

export default function* searchSaga() {
  yield takeEvery(initSearchData, handleInitSearchData);
  yield takeEvery(loadSearchMore, handleLoadSearchMore);
}
