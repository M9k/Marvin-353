import { call, put } from 'redux-saga/effects';
import { userAction } from '../reducers/user';
import tryLoginWeb3 from '../web3calls/tryLogin';

export function* tryLogin(action) {
  // call the web3call for try to login
  const userType = yield call(tryLoginWeb3);
  // update the user state via reducer
  yield put({ type: userAction.USER_LOGGED_IN, role: Number(userType) });
}

