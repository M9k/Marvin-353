import { call, put } from 'redux-saga/effects';
import { universityAction } from '../actions/actions';
import numAdmin from '../web3calls/numAdmin';
import addAdminWeb3 from '../web3calls/addAdmin';
import getAdminWeb3 from '../web3calls/getAdmin';

export function* adminNumber() {
  const administratorNumber = yield call(numAdmin);
  yield put({ type: universityAction.ADMIN_NUMBER, adminNumber: Number(administratorNumber) });
}

export function* addAdmin(action) {
  try {
    yield call(addAdminWeb3, web3.eth.accounts[0], action.address);
  } catch (e) {
    console.log('Failed!');
  }
  // const nAdmin = yield call(numAdmin);
  // yield put({ type: universityAction.ADD_NEW_ADMIN, adminNumber: Number(nAdmin) });
}

export function* getAllAdmins(action) {
  const num = Number(action.number);
  const admins = [];
  for (let i = 0; i < num; i += 1) {
    admins[i] = yield call(getAdminWeb3, i);
  }
  yield put({
    type: universityAction.RETURN_ALL_ADMINS,
    number: num,
    account: Array(admins),
  });
}

