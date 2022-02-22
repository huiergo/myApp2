import Taro from '@tarojs/taro';
import { getJSON } from '../services/method';
import apis from '../services/apis';

let resultData = [
  {
    difficulty: 1,
    title: 'Question的优势是什么？',
    likeNum: 666,
    pvNum: 99,
    isLike: true,
  },
  {
    difficulty: 2,
    title: 'Question的优势是什么？',
    likeNum: 666,
    pvNum: 99,
    isLike: true,
  },
  {
    difficulty: 0,
    title: 'Question的优势是什么？',
    likeNum: 666,
    pvNum: 99,
    isLike: true,
  },
  {
    difficulty: 1,
    title: 'Question的优势是什么？',
    likeNum: 666,
    pvNum: 99,
    isLike: true,
  },
  {
    difficulty: 1,
    title: 'Question的优势是什么？',
    likeNum: 666,
    pvNum: 99,
    isLike: true,
  },
  {
    difficulty: 1,
    title: 'Question的优势是什么？',
    likeNum: 666,
    pvNum: 99,
    isLike: true,
  },
];
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

// 获取首页数据
export async function loadData() {
  return resultData;
  // let result = await getJSON(apis.getClockIn);
  // if (result && result.data && result.data.data) {
  //   return result.data.data.flag;
  // } else {
  //   Taro.showToast({ title: '拉取失败' });
  // }
}
