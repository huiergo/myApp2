import Taro from '@tarojs/taro';
import { getJSON, postJSON } from '../services/method';
import apis from '../services/apis';
import { takeEvery, put } from 'redux-saga/effects';
import { initData, loadMore, saveInitData, saveLoadMore } from '../actions/sub_zan.action';

/**
 * 获取”初始化“列表，并同步到store
 */
function* handleInitData({ payload }) {
  const { type, page } = payload;
  let result = yield getJSON({
    url: apis.getRecommendList,
    data: { page },
  });

  yield put(saveInitData({ type, list: result, page }));
}

/**
 * 获取”更多“列表，并同步到store
 */
function* handleLoadMore({ payload }) {
  const { type, page } = payload;

  let result = yield getJSON({
    url: apis.getRecommendList,
    data: { page },
  });
  // todo 验证，临时修改

  let { pageTotal, rows: list } = result;
  yield put(saveLoadMore({ type, list, page, pageTotal }));
}
export default function* () {
  yield takeEvery(initData, handleInitData);
  yield takeEvery(loadMore, handleLoadMore);
}
