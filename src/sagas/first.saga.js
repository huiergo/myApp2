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
  const { type, page, questionBankType } = payload;
  let result = yield getJSON({ url: apis.getQuestionList, data: { page, type, questionBankType } });
  let { pageTotal, rows: list } = result;
  yield put(saveInitData({ type, list, page, pageTotal }));
}

/**
 * 获取”更多“列表，并同步到store
 */
function* handleLoadMore({ payload }) {
  const { type, page, questionBankType } = payload;
  let result = yield getJSON({ url: apis.getQuestionList, data: { page, type, questionBankType } });
  let { pageTotal, rows: list } = result;
  yield put(saveLoadMore({ type, list, page, pageTotal }));
}

/**
 * 获取分类
 */
function* handleCategory() {
  let cateList = yield getJSON({ url: apis.getCategory });
  yield put(saveCategory({ cateList }));
  yield put(saveCategoryToTag({ cateList }));
}

export default function* experienceSaga() {
  yield takeEvery(initData, handleInitData);
  yield takeEvery(loadMore, handleLoadMore);
  yield takeEvery(category, handleCategory);
}
