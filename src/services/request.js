import Taro from '@tarojs/taro';
// import '@tarojs/async-await';
import { getJSON, postJSON } from './method';
import apis from './apis';

//首页mock
export async function getClockIn() {
  let result = await getJSON(apis.getClockIn);
  if (result && result.data && result.data.data) {
    return result.data.data.flag;
  } else {
    Taro.showToast({ title: '拉取失败' });
  }
}

export async function getQuestionList(params) {
  let result = await getJSON(apis.getQuestionList, params);
  if (result && result.data && result.data.data) {
    return result.data.data.flag;
  } else {
    Taro.showToast({ title: '拉取失败' });
  }
}
