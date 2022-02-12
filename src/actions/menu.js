import Taro from '@tarojs/taro';
import { getJSON } from '../services/method';
import apis from '../services/apis';

// 切换当前分类
export function changeMenu({ currentIdx, currentValue }) {
  return (dispatch) => {
    dispatch({
      type: 'changeMenu',
      currentIdx,
      currentValue,
    });
  };
}

//首页打卡
export async function getClockIn() {
  let result = await getJSON(apis.getClockIn);
  if (result && result.data && result.data.data) {
    return result.data.data.flag;
  } else {
    Taro.showToast({ title: '拉取失败' });
  }
}
