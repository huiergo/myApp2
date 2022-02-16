import Taro, { Events } from '@tarojs/taro';

export default function common(preState, action) {
  switch (action.type) {
    case 'tabShow':
      return {
        ...preState,
        currentTab: action.currentTab,
      };
    default:
      return {
        ...preState,
      };
  }
}
