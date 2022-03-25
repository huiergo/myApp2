import { handleActions as createReducer } from 'redux-actions';
import { syncFlag, syncUser } from '../actions/common.action';

const initialState = {
  userInfo: {
    avatar:
      'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
    clockinNumbers: 0,
    clockinTotal: 0,
    nickName: '微信用户',
  },
  flag: false,
};

const handleSyncUser = (state, action) => {
  return {
    ...state,
    userInfo: action.payload,
  };
};

const handleSyncFlag = (state, action) => {
  return {
    ...state,
    flag: action.payload,
  };
};

export default createReducer(
  {
    [syncUser]: handleSyncUser,
    [syncFlag]: handleSyncFlag,
  },
  initialState,
);
