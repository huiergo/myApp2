import { combineReducers } from 'redux';
import counter from './counter';
import menu from './menu';

export default combineReducers({
  counter,
  menu,
});
