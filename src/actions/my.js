import { getJSON, postJSON } from '../services/method';
import apis from '../services/apis';

// 登录接口: 入参-code，
//   存共享状态： 出参-后续交互使用的token,  token过期后，刷新token使用,
//   出参-昵称，名字

/**
 * 获得登录态
 * 刷新登录态
 */

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
