import Taro from '@tarojs/taro';
import apis from '../services/apis';

let errCount = 0;

/**
 * taro 请求封装
 */
export function taroRequest({ url, data, method, headers }) {
  let token = Taro.getStorageSync('token');
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
        console.log('taro request success----', result.data.data);
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
        console.log('taro request err----', err);
        reject(err);
      });
  });
}

/**
 * 获取token
 */
export async function handleGetToken() {
  let { code } = await Taro.login();
  console.log('login 换取code----', code);
  try {
    let result = await postJSON({ url: apis.login, data: { code } });
    console.log('login接口 请求结果 data----', result);
    let { token, refreshToken } = result;
    console.log('login接口 请求结果 token, refreshToken----', token, refreshToken);
    Taro.setStorageSync('token', token);
    Taro.setStorageSync('refreshToken', refreshToken);
    console.log('token存储成功----');
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
  console.log('请求入参---', { url, data: requestData, method, headers });
  let { statusCode, message, data } = await taroRequest({
    url,
    data: requestData,
    method,
    headers,
  });
  console.log('请求结果----', statusCode, message, data);

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
    // Taro.checkSession({
    //   success: function (res) {
    //     //session_key 未过期，并且在本生命周期一直有效
    //     console.log('未过期---', res);
    //   },
    //   fail: function (err) {
    //     // session_key 已经失效，需要重新执行登录流程
    //     // Taro.login(); //重新登录
    //     console.log('过期--', err);
    //   },
    // });

    let valid = await Taro.checkSession();
    let notEmpire = valid.errMsg.indexOf('ok') > -1;
    console.log('是否过期---', valid.errMsg.indexOf('ok') > -1); //isEmpire.errMsg.indexOf('ok') > -1
    if (notEmpire) {
      // 未过期
      if (errCount > 1) return;
      await handleRefreshToken();
    }
    // Taro.checkSession({
    //   success: function () {
    //     //session_key 未过期，并且在本生命周期一直有效
    //      handleRefreshToken();
    //   },
    //   fail: function () {
    //     // session_key 已经失效，需要重新执行登录流程
    //     handleGetToken();//重新登录
    //   }
    // })
    // console.log('开始refreshToken....');

    // let { data: result1 } = await taroRequest({
    //   url,
    //   data: requestData,
    //   method,
    //   headers,
    // });
    // return result1;
  }
}

/**
 * 刷新token
 */
export async function handleRefreshToken() {
  let storage_refreshToken = Taro.getStorageSync('refreshToken');
  let storage_token = Taro.getStorageSync('token');
  let { data } = await postJSON({
    url: apis.refreshToken,
    data: { token: storage_token },
    headers: { Authorization: 'Bearer ' + storage_refreshToken },
  });
  console.log('刷新token 的值---', data);
  let { token, refreshToken } = data;
  Taro.setStorageSync('token', token);
  Taro.setStorageSync('refreshToken', refreshToken);
}
