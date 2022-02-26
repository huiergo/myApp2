import { combineReducers } from 'redux';
import home from './home';
// import search from './search';
import common from './common';
import mine from './mine.reducer';
import one from './one.reducer';
import experience from './experience.reducer';
import search from './search.reducer';
import first from './first.reducer';
import tag from './tag.reducer';
import tags from './tags';

export default combineReducers({
  home,
  search,
  common,
  mine,
  one,
  experience,
  first,
  tag,
  tags,
});
