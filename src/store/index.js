import { createStore, applyMiddleware, compose } from 'redux';
// import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, createLogger()];

export default function configStore() {
  const store = createStore(rootReducer, applyMiddleware(...middlewares));
  store.runSaga = sagaMiddleware.run;
  return store;
}
