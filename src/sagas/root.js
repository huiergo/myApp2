import { all } from 'redux-saga/effects';
import mySaga from './mine.saga';

export default function* rootSaga() {
  yield all([mySaga()]);
}
