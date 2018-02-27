import { fork, takeLatest } from 'redux-saga/effects';
import { userAction } from '../reducers/user';
import { universityAction } from '../reducers/university';
import { tryLogin } from './userSaga';
import { adminNumber } from './universitySaga';

// main saga generators
export function* sagas() {
  yield [
    fork(takeLatest, userAction.USER_TRY_LOGIN, tryLogin),
    fork(takeLatest, universityAction.GET_ADMIN_NUMBER, adminNumber),
  ];
}
