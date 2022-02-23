import { all } from 'redux-saga/effects';
import mySaga from './mine.saga';
import loginSaga from './login.saga';

export default function* rootSaga() {
  yield all([mySaga(), loginSaga()]);
}
