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
  const { type, page } = payload;
  let result = yield getJSON(apis.getRecommendList, { page });
  console.log('初始化数据-----', result);
  if (result && result.data && result.data.data) {
    let pageTotal = result.data.data.pageTotal;
    let list = result.data.data.rows;
    yield put(saveInitData({ type, list, page, pageTotal }));
  }
}

/**
 * 获取”更多“列表，并同步到store
 */
function* handleLoadMore({ payload }) {
  const { type, page } = payload;
  let result = yield getJSON(apis.getRecommendList, { page });
  if (result && result.data && result.data.data) {
    let list = result.data.data.rows;
    yield put(saveLoadMore({ type, list, page }));
  }
}

/**
 * 获取分类
 */
function* handleCategory() {
  let result = yield getJSON(apis.getCategory);
  if (result && result.data && result.data.data) {
    let cateList = result.data.data;
    yield put(saveCategory({ cateList }));
    yield put(saveCategoryToTag({ cateList }));
  }
}

export default function* experienceSaga() {
  yield takeEvery(initData, handleInitData);
  yield takeEvery(loadMore, handleLoadMore);
  yield takeEvery(category, handleCategory);
}
