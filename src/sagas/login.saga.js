import Taro from '@tarojs/taro';
import { takeEvery, put, select } from 'redux-saga/effects';
import { getJSON, postJSON } from '../services/method';
import apis from '../services/apis';
import { getToken, getRefreshToken } from '../actions/login.action';

/**
 * 获取token
 */
function* handleGetToken() {
  let { code } = yield Taro.login();
  let result = yield postJSON(apis.login, { code });
  if (result && result.data && result.data.data) {
    let { token, refreshToken } = result.data.data;
    Taro.setStorageSync('token', token);
    Taro.setStorageSync('refreshToken', refreshToken);
  }
}

/**
 * 刷新token
 */
function* handleRefreshToken() {
  const state = yield select();
  let result = yield postJSON(apis.refreshToken, { refreshToken: state.mine.refreshToken });
  console.log('333refresh 执行了=====');
  if (result && result.data && result.data.data) {
    let { token, refreshToken } = result.data.data;
    Taro.setStorageSync('token', token);
    Taro.setStorageSync('refreshToken', refreshToken);
  }
}
export default function* loginSaga() {
  yield takeEvery(getToken, handleGetToken);
  yield takeEvery(getRefreshToken, handleRefreshToken);
}

// todo 所有的else， 和所有的错误处理
// todo 埋点等数据上报
