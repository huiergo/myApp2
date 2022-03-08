import Taro from '@tarojs/taro';
import apis from '../services/apis';

async function fetchUrl({ method, url, data }) {
  Taro.showLoading();
  let token = Taro.getStorageSync('token');
  console.log('token');
  return new Promise((resolve, reject) => {
    Taro.request({
      url: url,
      data: data,
      method: method,
      header: {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + token,
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
  console.log('[getJSON result ====]', result);

  if (result && result.data && result.data.code === 10000) {
    // 请求正常
    return result;
  }
  if (result && result.data && result.data.code === -1) {
    // 请求成功， 但是有错误信息
    Taro.showToast({ title: result.data.message });
  }
  if (result && result.data && result.data.code === 401) {
    if (errCount > 1) {
      let r1 = await handleGetToken();
      console.log('get 401----', r1);
      if (r1) {
        let result1 = await fetchUrl({ method: 'GET', url, data });
        console.log('get 401 result1----', r1);
        return result1;
      }
      return;
    } else {
      errCount++;
      let refreshResult = await handleRefreshToken();
      console.log('get 111', refreshResult);
      if (refreshResult) {
        let result1 = await fetchUrl({ method: 'GET', url, data });
        console.log('get 222', result1);
        return result1;
      }
    }
  }
}

export async function postJSON(url, data) {
  let result = await fetchUrl({ method: 'POST', url, data });
  console.log('[getJSON result ====]', result);

  if (result && result.data && result.data.code === 10000) {
    // 请求正常
    return result;
  }
  if (result && result.data && result.data.code === -1) {
    // 请求成功， 但是有错误信息
    Taro.showToast({ title: result.data.message });
  }
  if (result && result.data && result.data.code === 401) {
    if (errCount > 1) {
      let r1 = await handleGetToken();
      console.log('post 401----', r1);
      if (r1) {
        let result1 = await fetchUrl({ method: 'POST', url, data });
        console.log('post 401 result----', r1);
        return result1;
      }
      return;
    } else {
      errCount++;
      let refreshResult = await handleRefreshToken();
      console.log('post 111', refreshResult);
      if (refreshResult) {
        let result1 = await fetchUrl({ method: 'POST', url, data });
        console.log('post 222', refreshResult);
        return result1;
      }
    }
  }
}

/**
 * 获取token
 */
export async function handleGetToken() {
  let { code } = await Taro.login();
  Taro.request({
    header: {
      'content-type': 'application/json',
    },
    url: apis.login,
    data: { code },
    method: 'POST',
  }).then((result) => {
    console.log('[fetchUrl result ======]', result);
    Taro.hideLoading();

    if (result && result.data && result.data.data) {
      let { token, refreshToken } = result.data.data;
      console.log('存储成功-------', token, refreshToken);
      Taro.setStorageSync('token', token);
      Taro.setStorageSync('refreshToken', refreshToken);
      return true;
    } else {
      return Taro.showToast({ title: '获取token失败' });
    }
  });
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
