import { handleActions as createReducer } from 'redux-actions';
import { changeOptType } from '../actions/mine.action';

const initialState = {};

const handleChangeOptType = (state, action) => {
  const optType = action.payload;
  return {
    ...state,
    optType,
  };
};

export default createReducer(
  {
    [changeOptType]: handleChangeOptType,
  },
  initialState,
);
