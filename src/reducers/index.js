import { combineReducers } from 'redux';
import home from './home';
// import search from './search';
import common from './common';
import tags from './tags';
import mine from './mine.reducer';
import one from './one.reducer';
import experience from './experience.reducer';
import search from './search.reducer';

export default combineReducers({
  home,
  search,
  common,
  tags,
  mine,
  one,
  experience,
});
