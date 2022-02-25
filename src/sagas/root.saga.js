import { all } from 'redux-saga/effects';
import mySaga from './mine.saga';
import loginSaga from './login.saga';
import experienceSaga from './experience.saga';
import searchSaga from './search.saga';

export default function* rootSaga() {
  yield all([mySaga(), loginSaga(), experienceSaga(), searchSaga()]);
}
