import Taro from '@tarojs/taro';
import { getJSON, postJSON } from '../services/method';
import apis from '../services/apis';
import { takeEvery, put, take } from 'redux-saga/effects';
import {
  loadUserInfo,
  loadFlag,
  clockIn,
  syncFlag,
  syncUser,
  submitUserInfo,
} from '../actions/common.action';

/**
 * 1、获取用户头像和昵称
 * 2、pageshow时候: 刷新页面（点赞数和签到数）
 * 3、flag: 判断签到模块的展示
 * 4、点击签到，请求接口
 */

/**
 * 获取用户信息，并同步到store
 */
function* handleLoadUserInfo() {
  let result = yield getJSON({ url: apis.getUserInfo });
  yield put(syncUser(result));
}

/**
 * 获取是否打卡状态，并同步到store
 */
function* handleFlag(params) {
  let result = yield getJSON({ url: apis.getFlag, data: params });
  yield put(syncFlag(result.flag));
}
/**
 * 打卡签到
 */
function* handleClockIn() {
  // todo : params 应该从store中取得，不应该组件传递
  let result = yield postJSON({ url: apis.clockIn });
  yield put(syncFlag(result));
}

/**
 * 向接口提交数据 saveUserInfo
 */
function* handleSubmitUserInfo(params) {
  // todo : params 应该从store中取得，不应该组件传递
  yield postJSON({ url: apis.saveUserInfo, data: params.payload });
}

export default function* mineSaga() {
  yield takeEvery(loadUserInfo, handleLoadUserInfo);
  yield takeEvery(loadFlag, handleFlag);
  yield takeEvery(clockIn, handleClockIn);
  yield takeEvery(submitUserInfo, handleSubmitUserInfo);
}
