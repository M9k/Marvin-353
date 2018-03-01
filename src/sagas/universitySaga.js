import { call, put } from 'redux-saga/effects';
import { universityAction } from '../reducers/university';
import numAdmin from '../web3calls/numAdmin';
// import getAdmin from '../web3calls/getAdmin';
// import addAdmin from '../web3calls/addAdmin';

export function* adminNumber() {
  const administratorNumber = yield call(numAdmin);
  yield put({ type: universityAction.ADMIN_NUMBER, adminNumber: Number(administratorNumber) });
}
