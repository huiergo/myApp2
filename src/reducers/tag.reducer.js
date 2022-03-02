import { handleActions as createReducer } from 'redux-actions';
import { updateTagList, resetTagList, saveCategoryToTag } from '../actions/tag.action';

const isObject = (val) => {
  return typeof val === 'object' && val !== null;
};

const deepClone = (obj, hash = new WeakMap()) => {
  if (!isObject(obj)) return obj;
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  let target = Array.isArray(obj) ? [] : {};
  hash.set(obj, target);
  Reflect.ownKeys(obj).forEach((item) => {
    if (isObject(obj[item])) {
      target[item] = deepClone(obj[item], hash);
    } else {
      target[item] = obj[item];
    }
  });

  return target;
};

let init_sortList = [
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
];
let init_cataList = [];
let initialState = {
  sortList: deepClone(init_sortList), //init_sortList.slice(0),
  cataList: deepClone(init_cataList),
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
    ...state,
    sortList: deepClone(init_sortList),
    cataList: deepClone(init_cataList),
  };
};

const buildCateData = (list) => {
  let result = list.map((item) => {
    return {
      name: item.name,
      active: false,
      canSort: false,
      specialStatus: 0,
    };
  });
  init_cataList = deepClone(result);
  return result;
};

const handleSaveCategoryToTag = (state, action) => {
  const { cateList } = action.payload;
  return {
    ...state,
    cataList: JSON.parse(JSON.stringify(buildCateData(cateList))),
  };
};

export default createReducer(
  {
    [updateTagList]: handleUpdateTagList,
    [resetTagList]: handleResetTagList,
    // 分类
    [saveCategoryToTag]: handleSaveCategoryToTag,
  },
  initialState,
);
