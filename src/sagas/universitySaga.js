import { call, put } from 'redux-saga/effects';
import { universityAction } from '../actions/actions';
import numAdmin from '../web3calls/numAdmin';
import addAdminWeb3 from '../web3calls/addAdmin';
import getAdminWeb3 from '../web3calls/getAdmin';

export function* adminNumber() {
  const administratorNumber = yield call(numAdmin);
  yield put({
    type: universityAction.SET_ADMIN_NUMBER,
    adminNumber: Number(administratorNumber),
  });
}

export function* addAdmin(action) {
  try {
    yield call(addAdminWeb3, action.address);
  } catch (e) {
    console.log('Failed!');
  }
  // automatic update of Redux state
  yield put({ type: universityAction.GET_ALL_ADMINS });
}

export function* getAllAdmins() {
  const num = yield call(numAdmin);
  const admins = [];
  for (let i = 0; i < num; i += 1) {
    admins[i] = yield call(getAdminWeb3, i);
  }
  yield put({
    type: universityAction.SET_ADMINS_LIST,
    number: num,
    account: admins,
  });
}

