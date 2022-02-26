import { handleActions as createReducer } from 'redux-actions';
import { updateTagList, resetTagList } from '../actions/tag.action';

const initialState = {
  sortList: [
    {
      specialStatus: 0,
      canSort: false,
      name: '默认',
      active: false,
    },
    {
      specialStatus: 0,
      canSort: true,
      name: '难易',
      active: false,
    },
    {
      specialStatus: 0,
      canSort: true,
      name: '浏览量',
      active: false,
    },
  ],
  cataList: [
    {
      specialStatus: 0,
      canSort: false,
      name: '美国',
      active: false,
    },
    {
      specialStatus: 0,
      canSort: true,
      name: '中国',
      active: false,
    },
    {
      specialStatus: 0,
      canSort: false,
      name: '巴西',
      active: false,
    },
    {
      specialStatus: 0,
      canSort: false,
      name: '日本',
      active: false,
    },
    {
      specialStatus: 0,
      canSort: false,
      name: '英国',
      active: false,
    },
    {
      specialStatus: 0,
      canSort: false,
      name: '法国',
      active: false,
    },
  ],
};

const resetState = {
  sortList: [
    {
      specialStatus: 0,
      canSort: false,
      name: '默认',
      active: false,
    },
    {
      specialStatus: 0,
      canSort: true,
      name: '难易',
      active: false,
    },
    {
      specialStatus: 0,
      canSort: true,
      name: '浏览量',
      active: false,
    },
  ],
  cataList: [
    {
      specialStatus: 0,
      canSort: false,
      name: '美国',
      active: false,
    },
    {
      specialStatus: 0,
      canSort: true,
      name: '中国',
      active: false,
    },
    {
      specialStatus: 0,
      canSort: false,
      name: '巴西',
      active: false,
    },
    {
      specialStatus: 0,
      canSort: false,
      name: '日本',
      active: false,
    },
    {
      specialStatus: 0,
      canSort: false,
      name: '英国',
      active: false,
    },
    {
      specialStatus: 0,
      canSort: false,
      name: '法国',
      active: false,
    },
  ],
};

const getNewTagList = ({ state, type, index }) => {
  let oriList = state[type];
  let result = oriList.map((tagItem, idx) => {
    // 因为是单选：所以都需要做active 取反
    idx == index ? (tagItem.active = true) : (tagItem.active = false);
    if (tagItem.canSort) {
      // 可排序类型
      if (idx == index && tagItem.specialStatus == 0) {
        tagItem.specialStatus = 1;
      } else {
        tagItem.specialStatus = 0;
      }
    }
    return tagItem;
  });
  return result;
};

const handleUpdateTagList = (state, action) => {
  const { type, index } = action.payload;
  let result = getNewTagList({ state, type, index });
  return {
    ...state,
    [type]: result,
  };
};

const handleResetTagList = (state, action) => {
  return {
    ...resetState,
  };
};
export default createReducer(
  {
    [updateTagList]: handleUpdateTagList,
    [resetTagList]: handleResetTagList,
  },
  initialState,
);
