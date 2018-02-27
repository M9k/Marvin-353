import { fork, takeLatest } from 'redux-saga/effects';
import { userAction } from '../reducers/user';
import { tryLogin } from './userSaga';
import { adminNumber } from './adminSaga';

// main saga generators
export function* sagas() {
  yield [
    fork(takeLatest, userAction.USER_TRY_LOGIN, tryLogin),
    adminNumber,
  ];
}
