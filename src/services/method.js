import Taro from '@tarojs/taro';
import apis from '../services/apis';

function fetchUrl({ method, url, data }) {
  Taro.showLoading();
  let token = Taro.getStorageSync('token');
  return new Promise((resolve, reject) => {
    Taro.request({
      url: url,
      data: data,
      method: method,
      header: {
        'content-type': 'application/json',
        token: token,
      },
    })
      .then((res) => {
        Taro.hideLoading();
        resolve(res);
      })
      .catch((err) => {
        reject(err);
        Taro.hideLoading();
      });
  });
}
let errCount = 0;
export async function getJSON(url, data) {
  let result = await fetchUrl({ method: 'GET', url, data });

  if (result && result.data && result.data.code !== -1) {
    // 请求正常
    return result;
  } else {
    if (errCount > 1) {
      return;
    } else {
      errCount++;
      let refreshResult = await handleRefreshToken();
      if (refreshResult) {
        let result1 = await fetchUrl({ method: 'POST', url, data });
        return result1;
      }
    }
  }
}

export async function postJSON(url, data) {
  let result = await fetchUrl({ method: 'POST', url, data });
  if (result && result.data && result.data.code !== -1) {
    // 请求正常
    return result;
  } else {
    if (errCount > 1) {
      return;
    } else {
      errCount++;
      let refreshResult = await handleRefreshToken();
      if (refreshResult) {
        let result1 = await fetchUrl({ method: 'POST', url, data });
        return result1;
      }
    }
  }
}

export function deleteJSON(url, data) {
  Taro.showLoading();
  return Taro.request({
    header: {
      'content-type': 'application/json',
    },
    url: url,
    data: data,
    method: 'DELETE',
  }).then((result) => {
    Taro.hideLoading();
    return result;
  });
}

/**
 * 获取token
 */
export async function handleGetToken() {
  let { code } = await Taro.login();
  let result = await postJSON(apis.login, { code });

  if (result && result.data && result.data.data) {
    let { token, refreshToken } = result.data.data;
    Taro.setStorageSync('token', token);
    Taro.setStorageSync('refreshToken', refreshToken);
  }
}

/**
 * 刷新token
 */
export async function handleRefreshToken() {
  let storage_refreshToken = Taro.getStorageSync('refreshToken');
  let result = await postJSON(apis.refreshToken, { token: storage_refreshToken });
  if (result && result.data && result.data.data) {
    let { token, refreshToken } = result.data.data;
    Taro.setStorageSync('token', token);
    Taro.setStorageSync('refreshToken', refreshToken);
  }
}
