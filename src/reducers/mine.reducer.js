import { handleActions as createReducer } from 'redux-actions';
import { saveUserInfo } from '../actions/mine.action';

const handleSaveUserInfo = (state, action) => {
  console.log('[handleSaveUserInfo====]', state, action);
  return action.payload;
};
const initialState = {};
export default createReducer(
  {
    [saveUserInfo]: handleSaveUserInfo,
  },
  initialState,
);

// const handleDeleteProductFromLocalCart = (state, action) => {
//   const newState = JSON.parse(JSON.stringify(state));
//   newState.splice(action.payload, 1);
//   return newState;
// }
