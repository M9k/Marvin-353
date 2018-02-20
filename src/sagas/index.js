import { fork, takeLatest } from 'redux-saga/effects';
import { userAction } from '../reducers/user';
import { tryLogin } from './userSaga';

// main saga generators
export function* sagas() {
  yield [
    fork(takeLatest, userAction.USER_TRY_LOGIN, tryLogin),
  ];
}
