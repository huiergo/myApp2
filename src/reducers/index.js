import { combineReducers } from 'redux';
import home from './home';
import search from './search';
import common from './common';

export default combineReducers({
  home,
  search,
  common,
});
