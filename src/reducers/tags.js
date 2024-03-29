import Taro, { Events } from '@tarojs/taro';

const tagState = {
  sortList: [
    {
      specialStatus: 0,
      special: false,
      name: '默认',
      active: false,
    },
    {
      specialStatus: 0,
      special: true,
      name: '难易',
      active: false,
    },
    {
      specialStatus: 0,
      special: true,
      name: '浏览量',
      active: false,
    },
  ],
  cataList: [
    {
      specialStatus: 0,
      special: false,
      name: '美国',
      active: false,
    },
    {
      specialStatus: 0,
      special: true,
      name: '中国',
      active: false,
    },
    {
      specialStatus: 0,
      special: false,
      name: '巴西',
      active: false,
    },
    {
      specialStatus: 0,
      special: false,
      name: '日本',
      active: false,
    },
    {
      specialStatus: 0,
      special: false,
      name: '英国',
      active: false,
    },
    {
      specialStatus: 0,
      special: false,
      name: '法国',
      active: false,
    },
  ],
};

export default function tags(preState = tagState, action) {
  switch (action.type) {
    case 'reset':
      return null;
    case 'updateSort':
      return {
        ...preState,
        sortList: action.type == 'sort' ? action.list : preState.sortList,
        cataList: action.type == 'cata' ? action.list : preState.cataList,
      };
    default:
      return {
        ...preState,
      };
  }
}
