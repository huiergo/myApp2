import Taro from '@tarojs/taro';
import { takeEvery, put, select } from 'redux-saga/effects';
import { getJSON, postJSON } from '../services/method';
import apis from '../services/apis';
import { getToken, getRefreshToken } from '../actions/login.action';
import { saveMineData } from '../actions/mine.action';

/**
 * 获取token
 */
function* handleGetToken() {
  let { code } = yield Taro.login();
  let result = yield postJSON(apis.login, { code });
  if (result && result.data && result.data.data) {
    let { token, refreshToken } = result.data.data;
    yield put(
      saveMineData({
        token,
        refreshToken,
      }),
    );
  }
}

/**
 * 刷新token
 */
function* handleRefreshToken() {
  const state = yield select();
  let result = yield postJSON(apis.refreshToken, { refreshToken: state.mine.refreshToken });
  if (result && result.data && result.data.data) {
    let { token, refreshToken } = result.data.data;
    yield put(
      saveMineData({
        token,
        refreshToken,
      }),
    );
  }
}
export default function* loginSaga() {
  yield takeEvery(getToken, handleGetToken);
  yield takeEvery(getRefreshToken, handleRefreshToken);
}

// todo 所有的else， 和所有的错误处理
// todo 埋点等数据上报
