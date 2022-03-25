import Taro from '@tarojs/taro';
import apis from '../services/apis';

// 接口报错后refreshToken次数
let repeatCount = 1;
let TAG = 'TaroRequest';

export async function newUserGetToken() {
  let { code } = await Taro.login();
  try {
    let result = await Taro.request({
      url: apis.login,
      data: { code },
      method: 'POST',
      header: {
        'content-type': 'application/json',
      },
    });
    if (result && result.data) {
      let { token, refreshToken } = result.data.data;
      Taro.setStorageSync('token', token);
      Taro.setStorageSync('refreshToken', refreshToken);
      return token;
    }
  } catch (err) {
    return Taro.showToast({ title: '获取token失败' });
  }
}

export async function taroRequest({ url, data, method, headers }) {
  let token = Taro.getStorageSync('token');
  if (!token) {
    token = await newUserGetToken();
  }
  return new Promise((resolve, reject) => {
    Taro.request({
      url: url,
      data: data,
      method: method,
      header: {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + token,
        ...headers,
      },
    })
      .then((result) => {
        if (result && result.data) {
          resolve({
            statusCode: result.data.code,
            message: result.data.message,
            data: result.data.data,
            result: result,
          });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export async function handleGetToken() {
  let { code } = await Taro.login();
  try {
    let result = await unionJSON({
      url: apis.login,
      data: { code },
      method: 'POST',
      retry: 0,
    });
    let { token, refreshToken } = result;
    Taro.setStorageSync('token', token);
    Taro.setStorageSync('refreshToken', refreshToken);
  } catch (err) {
    return Taro.showToast({ title: '获取token失败' });
  }
}

export async function getJSON({ url, data, headers }) {
  return await unionJSON({ url, data, headers, method: 'GET', retry: repeatCount });
}

export async function postJSON({ url, data, headers }) {
  return await unionJSON({ url, data, headers, method: 'POST', retry: repeatCount });
}

export async function unionJSON({ url, data: requestData, method, headers, retry }) {
  try {
    let { statusCode, message, data } = await taroRequest({
      url,
      data: requestData,
      method,
      headers,
    });
    if (statusCode === 10000) {
      // 请求正常
      return data;
    }
    if (statusCode === -1) {
      // 请求成功， 但是有错误信息
      Taro.showToast({ title: message });
    }
    if (statusCode === 401) {
      retry--;
      let valid = await Taro.checkSession();
      if (valid.errMsg.indexOf('ok') > -1) {
        // 未过期
        if (retry < 0) return;
        await handleRefreshToken();
        return await unionJSON({ url, data: requestData, method, headers, retry });
      } else {
        await handleGetToken();
        return await unionJSON({ url, data: requestData, method, headers, retry });
      }
    }
  } catch (error) {
    await handleGetToken();
    return await unionJSON({ url, data: requestData, method, headers, retry });
  }
}

export async function handleRefreshToken() {
  let storage_refreshToken = Taro.getStorageSync('refreshToken');
  let storage_token = Taro.getStorageSync('token');

  let data = await unionJSON({
    url: apis.refreshToken,
    data: { token: storage_token },
    headers: { Authorization: 'Bearer ' + storage_refreshToken },
    method: 'POST',
    retry: 0,
  });
  let { token, refreshToken } = data;

  Taro.setStorageSync('token', token);
  Taro.setStorageSync('refreshToken', refreshToken);
}
