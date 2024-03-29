import Taro from '@tarojs/taro';
// import '@tarojs/async-await';

export function getJSON(url, data) {
  Taro.showLoading();
  return Taro.request({
    url: url,
    data: data,
    method: 'GET',
    header: {
      'content-type': 'application/json',
    },
  }).then((result) => {
    Taro.hideLoading();
    return result;
  });
}
export function postJSON(url, data) {
  Taro.showLoading();
  return Taro.request({
    header: {
      'content-type': 'application/json',
    },
    url: url,
    data: data,
    method: 'POST',
  }).then((result) => {
    Taro.hideLoading();
    return result;
  });
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
