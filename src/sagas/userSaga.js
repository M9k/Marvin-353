import { call, put } from 'redux-saga/effects';
import { userAction } from '../actions/actions';
import login from '../web3calls/login';

export function* tryLogin() {
  // call the web3call for try to login
  const userType = yield call(login);
  console.log('You are a: ');
  console.log(Number(userType));
  // update the user state via reducer
  yield put({ type: userAction.USER_LOGGED_IN, role: Number(userType) });

  /* future call

  const addAdminUser = yield call(addAdmin('0xf17f52151EbEF6C7334FAD080c5704D77216b732'));
  alert(addAdminUser);

  const getAdminFirst = yield call(getAdmin(0));
  alert(getAdminFirst);

  */
}
export function* notBreakTheLint() {
  yield console.log('Non lint break, no refactor the lazy way');
}

