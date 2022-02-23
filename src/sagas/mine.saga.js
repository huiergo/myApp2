import Taro from '@tarojs/taro';
import { getJSON, postJSON } from '../services/method';
import apis from '../services/apis';
import { takeEvery, put } from 'redux-saga/effects';
import { loadUserInfo, loadFlag, clockIn, saveMineData } from '../actions/mine.action';

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
  let result = yield getJSON(apis.getUserInfo);
  if (result && result.data && result.data.data) {
    console.log(111);
    let userInfo = {
      avatar:
        'https://img2.baidu.com/it/u=1028277752,678118340&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
      name: '油炸小饭团1',
      zanNum: 32,
      clockInNum: 12,
    };
    yield put(saveMineData({ userInfo: userInfo }));
  }
}

/**
 * 获取是否打卡状态，并同步到store
 */
function* handleFlag(params) {
  let result = yield getJSON(apis.getFlag, params);
  if (result && result.data && result.data.data) {
    let flag = false; // || result.data.data;
    yield put(saveMineData({ key: 'flag', value: flag }));
  }
}
/**
 * 打卡签到
 */
function* handleClockIn() {
  // todo : params 应该从store中取得，不应该组件传递
  let result = yield postJSON(apis.clockIn);
  console.log('44====', result);
  if (result && result.data && result.data.data) {
    let flag = true || result.data.data;
    yield put(saveMineData({ flag }));
  }
}

export default function* mineSaga() {
  yield takeEvery(loadUserInfo, handleLoadUserInfo);
  yield takeEvery(loadFlag, handleFlag);
  yield takeEvery(clockIn, handleClockIn);
}
