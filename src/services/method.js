import Taro from '@tarojs/taro';
import apis from '../services/apis';

let errCount = 0;

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
  let token = Taro.getStorageSync('token');
  console.log(444, token);
  if (!token) {
    token = await newUserGetToken();
    console.log(666, token);
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
    let result = await postJSON({ url: apis.login, data: { code } });
    let { token, refreshToken } = result;
    Taro.setStorageSync('token', token);
    Taro.setStorageSync('refreshToken', refreshToken);
  } catch (err) {
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

    if (statusCode === 10000) {
      // 请求正常
      return data;
    }
    if (statusCode === -1) {
      // 请求成功， 但是有错误信息
      Taro.showToast({ title: message });
    }
    if (statusCode === 401) {
      errCount++;
      let valid = await Taro.checkSession();
      if (valid.errMsg.indexOf('ok') > -1) {
        // 未过期
        if (errCount > 1) return;
        await handleRefreshToken();
        errCount = 0;
        return await unionJSON({ url, data: requestData, method, headers });
      } else {
      }
    }
  } catch (error) {
    console.log('error====', error);
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
  let { token, refreshToken } = data;
  Taro.setStorageSync('token', token);
  Taro.setStorageSync('refreshToken', refreshToken);
}
