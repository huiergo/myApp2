// * 1、获取用户头像和昵称
// * 2、pageshow时候: 刷新页面（点赞数和签到数）
// * 3、flag: 判断签到模块的展示
// * 4、点击签到，请求接口
import Taro from '@tarojs/taro';
import { getJSON, postJSON } from '../services/method';
import apis from '../services/apis';

// 登录接口: 入参-code，
//   存共享状态： 出参-后续交互使用的token,  token过期后，刷新token使用,
//   出参-昵称，名字
export async function getLogin({ code }) {
  let result = await postJSON(apis.login, { code });
  if (result && result.data && result.data.data) {
    //  todo  同步下共享数据的token和refreshToken
    return result.data.data;
  }
}

// 刷新token
export async function getRefreshToken({ refreshToken }) {
  let result = await postJSON(apis.refreshToken, { refreshToken });
  if (result && result.data && result.data.data) {
    //  todo  同步下共享数据的token和refreshToken
    return result.data.data;
  }
}

/**
 * 状态： userInfo
 * 更新状态刷新： 点赞数， 签到数
 * getUserInfo
 * getClockIn
 *
 * 获得登录态
 * 刷新登录态
 *
 *
 * 1、获取用户数据
      pageshow时候: 刷新页面（点赞数和签到数）
 * 3、flag: 判断签到模块的展示
 * 4、点击签到，请求接口
 *
 */
