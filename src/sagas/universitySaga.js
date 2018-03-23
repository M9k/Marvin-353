import { call, put, all } from 'redux-saga/effects';
import { universityAction } from '../actions/actions';
import numAdmin from '../web3calls/numAdmin';
import addAdminWeb3 from '../web3calls/addAdmin';
import removeAdminWeb3 from '../web3calls/removeAdmin';
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
}

export function* removeAdmin(action) {
  try {
    yield call(removeAdminWeb3, action.address);
  } catch (e) {
    console.log('Failed!');
  }
}

export function* getAllAdmins() {
  let num = yield call(numAdmin);
  num = Number(num);
  const apiCalls = Array(num).fill().map((_, i) => call(getAdminWeb3, i));
  const admins = yield all(apiCalls);
  yield put({
    type: universityAction.SET_ADMINS_LIST,
    number: num,
    account: admins,
  });
}

