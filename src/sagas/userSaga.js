import { call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { userAction } from '../reducers/user';
import AccountTypes from '../components/AccountEnum';

export function* tryLogin(action) {
  // call the web3call for try to login
  // yield call(ApiUsers.delete);

  // finta attesa per dimostrare che è asincrono
  yield delay(1000);
  // azione di login avvenuta con successo
  yield put({ type: userAction.USER_LOGGED_IN, role: AccountTypes.ADMIN });
  console.log('OK');
}

