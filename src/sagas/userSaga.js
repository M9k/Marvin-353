import { call, put } from 'redux-saga/effects';
import { userAction } from '../actions/actions';
import login from '../web3calls/login';

export function* tryLogin() {
  // call the web3call for try to login
  console.log('A');
  const userType = yield call(login);
  console.log('B');
  console.log('You are a: ');
  console.log(Number(userType));
  // update the user state via reducer
  yield put({ type: userAction.USER_LOGGED_IN, role: Number(userType) });
}
export function* notBreakTheLint() {
  yield console.log('Non lint break, no refactor the lazy way');
}

