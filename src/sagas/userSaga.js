import { call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { userAction } from '../reducers/user';
import AccountTypes from '../components/AccountEnum';

// TODO sostituire con quella reale
import funzioneTest from '../web3calls/tryLogin';

export function* tryLogin(action) {
  // call the web3call for try to login
  const userType = yield call(funzioneTest);
  alert(userType);
  // TODO rimuovere
  // finta attesa per dimostrare che è asincrono
  yield delay(1000);
  // azione di login avvenuta con successo
  // alert(userType);
  yield put({ type: userAction.USER_LOGGED_IN, role: userType });
  console.log('OK');
}

