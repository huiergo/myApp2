import { combineReducers } from 'redux';
import mine from './mine.reducer';
import experience from './experience.reducer';
import search from './search.reducer';
import first from '../pages/first/first.reducer';
import tag from './tag.reducer';
import favorite from './favorite.reducer';
import sub_history from './sub_history.reducer';
import common from './common.reducer';

export default combineReducers({
  common,
  search,
  mine,
  experience,
  first,
  tag,
  favorite,
  sub_history,
});
