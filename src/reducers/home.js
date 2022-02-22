import Taro, { Events } from '@tarojs/taro';

const menuState = {
  list: [
    { type: 'all', title: '全部' },
    { type: 'React', title: 'React' },
    { type: 'Vue', title: 'Vue' },
    { type: 'mobile', title: '移动端布局' },
    { type: 'css', title: 'CSS' },
    { type: 'JavaScript1', title: 'JavaScript' },
    { type: 'React1', title: 'React' },
    { type: 'Vue1', title: 'Vue' },
    { type: 'css1', title: 'CSS1' },
  ],
  currentIdx: 0,
  currentValue: { type: 'all', title: '全部' },
};

export default function home(preState = menuState, action) {
  console.log('[reducer home action----]', action);
  switch (action.type) {
    case 'changeMenu':
      return {
        ...preState,
        currentIdx: action.currentIdx,
        currentValue: action.currentValue,
      };

    default:
      return {
        ...preState,
      };
  }
}
