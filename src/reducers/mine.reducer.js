import { handleActions as createReducer } from 'redux-actions';
import { saveMineData, changeOptType } from '../actions/mine.action';

const initialState = {
  userInfo: '',
  flag: '',
};

const handleSaveData = (state, action) => {
  // let { key, value } = action.payload;
  return {
    ...state,
    ...action.payload,
  };
};

const handleChangeOptType = (state, action) => {
  const optType = action.payload;
  return {
    ...state,
    optType,
  };
};
export default createReducer(
  {
    [saveMineData]: handleSaveData,
    [changeOptType]: handleChangeOptType,
  },
  initialState,
);
