import Taro from '@tarojs/taro';
import { getJSON, postJSON } from '../services/method';
import apis from '../services/apis';

// 初始化
// 上拉加载更多
// 下拉刷新
// 切换菜单（判断初始化，或是不变）

//请求首页数据
export function getInitList(params) {
  return async (dispatch) => {
    let result = await getJSON(apis.getQuestionList, params);
    if (result && result.data && result.data.data) {
      dispatch({ type: 'getInitList', list: result.data.data, identityId: '', page: '' });
    }
  };
}

// //请求下页数据
export function getNextList(params) {
  return async (dispatch) => {
    let result = await getJSON(apis.getQuestionList, params);
    if (result && result.data) {
      if (result && result.data && result.data.data) {
        if (result.data.data.rows && result.data.data.rows.length > 0) {
          dispatch({ type: 'appendList', list: result.data.data, identityId: '', page: '' });
        }
      }
    }
  };
}
