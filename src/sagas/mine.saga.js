import { takeEvery, put } from 'redux-saga/effects';
import { loadUserInfo, saveUserInfo } from '../actions/mine.action';
import { getUserInfo } from '../actions/my';

/**
 * 1、获取用户头像和昵称
 * 2、pageshow时候: 刷新页面（点赞数和签到数）
 * 3、flag: 判断签到模块的展示
 * 4、点击签到，请求接口
 */

function* handleLoadUserInfo() {
  const { userInfo } = yield getUserInfo();
  yield put(saveUserInfo(userInfo));
}
export default function* mineSaga() {
  yield takeEvery(loadUserInfo, handleLoadUserInfo);

  // 其他方法
  // yield takeEvery(deleteProductFromCart, handleDeleteProductFromCart);
}
