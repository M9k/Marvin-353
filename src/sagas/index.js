import { fork, takeLatest } from 'redux-saga/effects';
import { userAction } from '../actions/actions';
import { tryLogin } from './userSaga';
import * as uSaga from './adminEmployerSaga';

// main saga generators
export function* sagas() {
  yield [
    fork(takeLatest, userAction.USER_TRY_LOGIN, tryLogin),
  ];
}
export function* notBreakTheLint() {
  yield console.log('Non lint break, no refactor the lazy way');
}

