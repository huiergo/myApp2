import { handleActions as createReducer } from 'redux-actions';
import {
  clearAllRecordList,
  deleteRecordByIndex,
  editTrigger,
  unShiftRecord,
  saveInitSearchData,
  saveLoadSearchMore,
} from '../actions/search.action';

const initialState = {
  recordList: ['吃饭', '睡觉', '打豆豆'],
  isEdit: false,
};
const handleUnShiftRecord = (state, action) => {
  // todo: 需要remove, 然后unshift
  const { item } = action.payload;
  let index = state.recordList.indexOf(item);
  if (index > -1) {
    state.recordList.splice(index, 1);
  }
  state.recordList.unshift(item);
  return {
    ...state,
    recordList: [...state.recordList],
  };
};

const handleClearAllRecordList = (state, action) => {
  return {
    ...state,
    recordList: [],
  };
};

const handleDeleteRecordByIndex = (state, action) => {
  const index = action.payload;
  // todo: 换一种方式
  state.recordList.splice(index, 1);

  return {
    ...state,
    recordList: [...state.recordList],
  };
};

const handleEditTrigger = (state, action) => {
  const isEdit = action.payload;
  return {
    ...state,
    isEdit,
  };
};

const handleSaveInitSearchData = (state, action) => {
  const { list, page } = action.payload;
  return {
    ...state,
    list,
    page,
  };
};

const handleSaveLoadSearchMore = (state, action) => {
  const { list, page } = action.payload;
  return {
    ...state,
    list,
    page,
  };
};

export default createReducer(
  {
    [clearAllRecordList]: handleClearAllRecordList,
    [deleteRecordByIndex]: handleDeleteRecordByIndex,
    [unShiftRecord]: handleUnShiftRecord,
    [editTrigger]: handleEditTrigger,
    [saveInitSearchData]: handleSaveInitSearchData,
    [saveLoadSearchMore]: handleSaveLoadSearchMore,
  },
  initialState,
);
