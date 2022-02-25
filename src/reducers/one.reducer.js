import { handleActions as createReducer } from 'redux-actions';
import { changeTab } from '../actions/one.action';

const initialState = {
  tabList: [{ title: '标签页1' }, { title: '标签页2' }, { title: '标签页3' }],
  currentIdx: 0,
};

const handleChangeTab = (state, action) => {
  return {
    ...state,
    currentIdx: action.payload,
    currentType: '',
  };
};
export default createReducer(
  {
    [changeTab]: handleChangeTab,
  },
  initialState,
);

// currentType: '',
// keyword: '',
// sort: '',
// questionBankType: '',
