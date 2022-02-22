import { handleActions as createReducer } from 'redux-actions';
import { saveUserInfo } from '../actions/mine.action';

const handleSaveUserInfo = (state, action) => {
  console.log('[handleSaveUserInfo====]', state, action);
  return {
    userInfo: action.payload,
  };
};
const initialState = {
  userInfo: '',
};
export default createReducer(
  {
    [saveUserInfo]: handleSaveUserInfo,
  },
  initialState,
);
