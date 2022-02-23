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

// 签到
export async function getClockIn(params) {
  let result = await getJSON(apis.getClockIn, params);
  if (result && result.data && result.data.data) {
    return (dispatch) => {
      dispatch({
        type: 'changeClockInStatus',
        flag: result.data.data.flag,
      });
    };
  } else {
    Taro.showToast({ title: '拉取失败' });
  }
}

// 获取用户数据（用于我的tab）
export async function getUserInfo() {
  let result = await getJSON(apis.getUserInfo);
  if (result && result.data && result.data.data) {
    console.log(111);
    return {
      userInfo: {
        avatar:
          'https://img2.baidu.com/it/u=1028277752,678118340&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
        name: '油炸小饭团1',
        zanNum: 32,
        clockInNum: 12,
      },
    };
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
