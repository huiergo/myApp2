import { handleActions as createReducer } from 'redux-actions';
import { changeActiveIdx, updateTabList, updateExtraParams } from './first.action';

const initialState = {
  activeIdx: 0,
  tabList: [],
};
// 以下是tab列表相关

const handleChangeActiveIdx = (state, action) => {
  return {
    ...state,
    activeIdx: action.payload,
  };
};

const handleUpdateTabList = (state, action) => {
  console.log('handleUpdateTabList----', action.payload);
  return {
    ...state,
    tabList: action.payload,
  };
};

const handleUpdateExtraParams = (state, action) => {
  return {
    ...state,
    extraParams: action.payload,
  };
};

export default createReducer(
  {
    [changeActiveIdx]: handleChangeActiveIdx,
    [updateTabList]: handleUpdateTabList,
    [updateExtraParams]: handleUpdateExtraParams,
  },
  initialState,
);