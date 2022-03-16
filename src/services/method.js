import Taro from '@tarojs/taro';
import apis from '../services/apis';

let errCount = 0;

export function taroRequest({ url, data, method, headers }) {
  let token = Taro.getStorageSync('token');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
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
    }, 1000);
  });
}

export async function handleGetToken() {
  let { code } = await Taro.login();
  try {
    let result = await postJSON({ url: apis.login, data: { code } });
    let { token, refreshToken } = result;
    Taro.setStorageSync('token', token);
    Taro.setStorageSync('refreshToken', refreshToken);
    console.log('get token end---');
  } catch (err) {
    console.log('get token error---', err);
    return Taro.showToast({ title: '获取token失败' });
  }
}

export async function getJSON({ url, data, headers }) {
  return await unionJSON({ url, data, headers, method: 'GET' });
}

export async function postJSON({ url, data, headers }) {
  return await unionJSON({ url, data, headers, method: 'POST' });
}

export async function unionJSON({ url, data: requestData, method, headers }) {
  try {
    let { statusCode, message, data } = await taroRequest({
      url,
      data: requestData,
      method,
      headers,
    });
    console.log('union request result----', statusCode, message, data);
    if (statusCode === 10000) {
      console.log('请求正常----10000', url, data);
      // 请求正常
      return data;
    }
    if (statusCode === -1) {
      console.log('请求 异常----  -1');
      // 请求成功， 但是有错误信息
      Taro.showToast({ title: message });
    }
    if (statusCode === 401) {
      console.log('请求 异常----  401');
      errCount++;
      console.log('errCount---', errCount);
      let valid = await Taro.checkSession();
      console.log('valid---', valid);
      if (valid.errMsg.indexOf('ok') > -1) {
        // 未过期
        if (errCount > 1) return;
        await handleRefreshToken();
        console.log('unionJSON start---');

        return await unionJSON({ url, data: requestData, method, headers });

        console.log('unionJSON end---');
      } else {
        console.log('else---');
      }
    }
  } catch (error) {
    console.log('unionJSON error---', error);
    await handleGetToken();
    return await unionJSON({ url, data: requestData, method, headers });
  }
}

export async function handleRefreshToken() {
  let storage_refreshToken = Taro.getStorageSync('refreshToken');
  let storage_token = Taro.getStorageSync('token');
  let data = await postJSON({
    url: apis.refreshToken,
    data: { token: storage_token },
    headers: { Authorization: 'Bearer ' + storage_refreshToken },
  });
  console.log('handler refresh data---', data);
  let { token, refreshToken } = data;
  Taro.setStorageSync('token', token);
  Taro.setStorageSync('refreshToken', refreshToken);
}
