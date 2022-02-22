import Taro from '@tarojs/taro';

// 检查是否过期
export function checkSession() {
  return new Promise((resolve, reject) => {
    Taro.checkSession({
      success: function () {
        //session_key 未过期，并且在本生命周期一直有效
        resolve(true);
      },
      fail: function () {
        // session_key 已经失效，需要重新执行登录流程
        Taro.login(); //重新登录
      },
    });
  });
}

// 调用接口获取登录凭证（code）
export function getCode() {
  return new Promise((resolve, reject) => {
    Taro.login({
      success: function (res) {
        if (res.code) {
          resolve(res.code);
        } else {
          reject({ title: '登录失败' + res.errMsg });
          //   return Taro.showToast();
        }
      },
    });
  });
}
