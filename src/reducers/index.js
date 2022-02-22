import { combineReducers } from 'redux';
import home from './home';
import search from './search';
import common from './common';
import tags from './tags';
import mine from './mine.reducer';

export default combineReducers({
  home,
  search,
  common,
  tags,
  mine,
});
