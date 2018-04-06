import { call, put, takeLatest, fork, spawn } from 'redux-saga/effects';
import * as sessionAction from '../ducks/Session';
import { login } from '../web3calls/University';

const actionType = action => (`marvin/SessionSaga/${action}`);

const LOGIN = actionType('LOGIN');
const UPDATE = actionType('UPDATE');

function* retrieveData(role) {
  console.log(role);
  yield true;
}

function* performLogin() {
  yield put(sessionAction.roleLoading());
  try {
    const userType = yield call(login);
    const role = Number(userType);
    yield put(sessionAction.setRole(role));
    yield spawn(retrieveData, role);
  } catch (e) {
    console.log('Failed!');
    yield put(sessionAction.setRole(null, true));
  }
}

export const loginAction = () => (
  { type: LOGIN }
);
export const updateData = () => (
  { type: UPDATE }
);

export default function* handler() {
  return yield [
    fork(takeLatest, LOGIN, performLogin),
    fork(takeLatest, UPDATE, retrieveData),
  ];
}
