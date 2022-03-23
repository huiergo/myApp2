import { all } from 'redux-saga/effects';
import experienceSaga from './experience.saga';
import searchSaga from './search.saga';
import firstSaga from './first.saga';
import favoriteSaga from './favorite.saga';
import subHistorySaga from './sub_history.saga';
import commonSaga from './common.saga';

export default function* rootSaga() {
  yield all([
    experienceSaga(),
    searchSaga(),
    firstSaga(),
    favoriteSaga(),
    subHistorySaga(),
    commonSaga(),
  ]);
}
