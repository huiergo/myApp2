import Taro from '@tarojs/taro';
import { getJSON, postJSON } from '../services/method';
import apis from '../services/apis';
import { takeEvery, put } from 'redux-saga/effects';
import { getToken, getRefreshToken } from '../actions/login.action';
import { saveMineData } from '../actions/mine.action';

/**
 * 获取token
 */
function* handleGetToken() {
  let { code } = yield Taro.login();
  let result = yield postJSON(apis.login, { code });
  console.log('请求登录接口结果4444====', result);
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
  let result = yield postJSON(apis.refreshToken);
  console.log('44====', result);
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
