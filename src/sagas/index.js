import { fork, takeLatest } from 'redux-saga/effects';
import { userAction } from '../actions/actions';
import { tryLogin } from './userSaga';
import * as uSaga from './universitySaga';

// main saga generators
export function* sagas() {
  yield [
    fork(takeLatest, userAction.USER_TRY_LOGIN, tryLogin),
    fork(takeLatest, uSaga.GET_ADMIN_NUMBER, uSaga.adminNumber),
    fork(takeLatest, uSaga.ADD_NEW_ADMIN, uSaga.addAdmin),
    fork(takeLatest, uSaga.REMOVE_ADMIN, uSaga.removeAdmin),
    fork(takeLatest, uSaga.GET_ALL_ADMINS, uSaga.getAllAdmins),
  ];
}
export function* notBreakTheLint() {
  yield console.log('Non lint break, no refactor the lazy way');
}

