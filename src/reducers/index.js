import { combineReducers } from 'redux';
import home from './home';
import search from './search';
import common from './common';
import tags from './tags';

export default combineReducers({
  home,
  search,
  common,
  tags,
});
