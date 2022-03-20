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
      console.log('5-111', result);
      console.log('555 token===', token);
      return token;
    }
  } catch (err) {
    return Taro.showToast({ title: '获取token失败' });
  }
}

export async function taroRequest({ url, data, method, headers }) {
  console.log(TAG, '【start request 参数】', url, data, method, headers);
  let token = Taro.getStorageSync('token');
  console.log(TAG, '【本地获取token】', token);
  if (!token) {
    token = await newUserGetToken();
    console.log(TAG, '【新用户】', token);
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
        console.log(TAG, '【请求数据成功=====】', url);
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
        console.log(TAG, '【请求数据 catch=====】', url);
        reject(err);
      });
  });
}
export async function handleGetToken() {
  let { code } = await Taro.login();
  console.log(TAG, '【login code=====】', code);
  try {
    let result = await unionJSON({
      url: apis.login,
      data: { code },
      method: 'POST',
      retry: 0,
    });
    let { token, refreshToken } = result;
    console.log(TAG, '【handleGetToken=====】', token, refreshToken);
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
    console.log(TAG, '【statusCode====】', statusCode, message, data, retry);
    if (statusCode === 10000) {
      // 请求正常
      return data;
    }
    if (statusCode === -1) {
      // 请求成功， 但是有错误信息
      Taro.showToast({ title: message });
    }
    if (statusCode === 401) {
      console.log(TAG, '【命中401】');
      retry--;
      let valid = await Taro.checkSession();
      if (valid.errMsg.indexOf('ok') > -1) {
        // 未过期
        if (retry < 0) return;
        console.log(TAG, `【retry ${retry} handleRefreshToken】`);
        await handleRefreshToken();
        return await unionJSON({ url, data: requestData, method, headers, retry });
      } else {
        console.log(TAG, '【handleRefreshToken else】', statusCode, message, data);
        await handleGetToken();
        return await unionJSON({ url, data: requestData, method, headers, retry });
      }
    }
  } catch (error) {
    console.log(TAG, 'error====', error);
    await handleGetToken();
    return await unionJSON({ url, data: requestData, method, headers, retry });
  }
}

export async function handleRefreshToken() {
  let storage_refreshToken = Taro.getStorageSync('refreshToken');
  let storage_token = Taro.getStorageSync('token');
  console.log(TAG, '【storage refresh】', storage_refreshToken, storage_token);

  let data = await unionJSON({
    url: apis.refreshToken,
    data: { token: storage_token },
    headers: { Authorization: 'Bearer ' + storage_refreshToken },
    method: 'POST',
    retry: 0,
  });
  let { token, refreshToken } = data;
  console.log(TAG, 'refresh 结果  ====', token, refreshToken);

  Taro.setStorageSync('token', token);
  Taro.setStorageSync('refreshToken', refreshToken);
}
