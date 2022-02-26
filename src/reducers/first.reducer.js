import { handleActions as createReducer } from 'redux-actions';
import { submitFilterParams, triggerModel } from '../actions/first.action';

const initialState = {
  extraParams: {},
  showModal: true,
};

const handleSubmitFilterParams = (state, action) => {
  return {
    ...state,
    extraParams: { ...state.extraParams, ...action.payload },
  };
};

const handleTrigger = (state, action) => {
  const value = action.payload;
  return {
    ...state,
    showModal: value,
  };
};
export default createReducer(
  {
    [submitFilterParams]: handleSubmitFilterParams,
    [triggerModel]: handleTrigger,
  },
  initialState,
);
