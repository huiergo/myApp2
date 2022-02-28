import { all } from 'redux-saga/effects';
import mySaga from './mine.saga';
import loginSaga from './login.saga';
import experienceSaga from './experience.saga';
import searchSaga from './search.saga';
import firstSaga from './first.saga';
import favoriteSaga from './favorite.saga';
import subzanSaga from './sub_zan.saga';
import subHistorySaga from './sub_history.saga';

export default function* rootSaga() {
  yield all([
    mySaga(),
    loginSaga(),
    experienceSaga(),
    searchSaga(),
    firstSaga(),
    favoriteSaga(),
    subzanSaga(),
    subHistorySaga(),
  ]);
}
