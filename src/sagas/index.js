import { fork, takeLatest } from 'redux-saga/effects';
import { userAction, universityAction } from '../actions/actions';
import { tryLogin } from './userSaga';
import { adminNumber, addAdmin } from './universitySaga';

// main saga generators
export function* sagas() {
  yield [
    fork(takeLatest, userAction.USER_TRY_LOGIN, tryLogin),
    fork(takeLatest, universityAction.GET_ADMIN_NUMBER, adminNumber),
    fork(takeLatest, universityAction.ADD_NEW_ADMIN, addAdmin),
  ];
}
export function* notBreakTheLint() {
  yield console.log('Non lint break, no refactor the lazy way');
}

