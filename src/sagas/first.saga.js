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
  saveLoading,
} from '../actions/first.action';
import { saveCategoryToTag } from '../actions/tag.action';

/**
 * 获取”初始化“列表，并同步到store
 */
function* handleInitData({ payload }) {
  const { type, page, questionBankType } = payload;
  let tempType = type.split('_')[1];
  yield put(saveLoading({ type, loading: true }));
  Taro.showLoading();
  let result = yield getJSON({
    url: apis.getQuestionList,
    data: { page, type: tempType, questionBankType },
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
  const { type, page, questionBankType } = payload;
  let tempType = type.split('_')[1];
  yield put(saveLoading({ type, loading: true }));
  Taro.showLoading();
  let result = yield getJSON({
    url: apis.getQuestionList,
    data: { page, type: tempType, questionBankType },
  });
  let { pageTotal, rows: list } = result;
  console.log('saveLoadMore before');
  yield put(saveLoadMore({ type, list, page, pageTotal }));

  yield put(saveLoading({ type, loading: false }));
  Taro.hideLoading();
  console.log('saveLoadMore after');
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
