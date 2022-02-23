import { handleActions as createReducer } from 'redux-actions';
import { saveMineData } from '../actions/mine.action';

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
export default createReducer(
  {
    [saveMineData]: handleSaveData,
  },
  initialState,
);
