import Taro from '@tarojs/taro';
import { getJSON, postJSON } from '../services/method';
import apis from '../services/apis';

// 初始化
// 上拉加载更多
// 下拉刷新
// 切换菜单（判断初始化，或是不变）
let mockInit = [
  { type: 'xxx', title: 'xxx' },
  { type: 'React', title: 'React' },
  { type: 'Vue', title: 'Vue' },
  { type: 'mobile', title: '移动端布局' },
  { type: 'css', title: 'CSS' },
  { type: 'JavaScript1', title: 'JavaScript' },
  { type: 'React1', title: 'React' },
  { type: 'Vue1', title: 'Vue' },
  { type: 'css1', title: 'CSS1' },
];
//请求首页数据
export async function getInitList(params) {
  let result = await getJSON(apis.getQuestionList, params);
  if (result && result.data && result.data.data) {
    // dispatch({ type: 'getInitList', list: result.data.data, page: params.page });
    return mockInit || result.data.data;
  }
}

let mock = [
  { type: 'all', title: '全部' },
  { type: 'React', title: 'React' },
  { type: 'Vue', title: 'Vue' },
  { type: 'mobile', title: '移动端布局' },
  { type: 'css', title: 'CSS' },
  { type: 'JavaScript1', title: 'JavaScript' },
  { type: 'React1', title: 'React' },
  { type: 'Vue1', title: 'Vue' },
  { type: 'css1', title: 'CSS1' },
];

export async function getMoreList(params) {
  // return async (dispatch) => {
  let result = await getJSON(apis.getQuestionList, params);
  if (result && result.data && result.data.data) {
    // dispatch({ type: 'getInitList', list: result.data.data, page: params.page });
    // return result.data.data;
    return mock;
  }
  // };
}
