import { combineReducers } from 'redux';
import mine from './mine.reducer';
import experience from './experience.reducer';
import search from './search.reducer';
import first from './first.reducer';
import tag from './tag.reducer';
import favorite from './favorite.reducer';
import sub_zan from './sub_zan.reducer';
import sub_history from './sub_history.reducer';

export default combineReducers({
  search,
  mine,
  experience,
  first,
  tag,
  favorite,
  sub_zan,
  sub_history,
});
