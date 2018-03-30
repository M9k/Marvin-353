import { call, put } from 'redux-saga/effects';
import { universityAction } from '../actions/actions';
import { getAdminAt, getAdminNumber, addNewAdmin, removeAdmin as removeAdminWeb3 } from '../web3calls/UniversityAdmin';

export function* adminNumber() {
  const administratorNumber = yield call(getAdminNumber);
  yield put({
    type: universityAction.SET_ADMIN_NUMBER,
    adminNumber: Number(administratorNumber),
  });
}

export function* addAdmin(action) {
  try {
    yield call(addNewAdmin, action.address);
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
  const num = yield call(getAdminNumber);
  const admins = [];
  for (let i = 0; i < num; i += 1) {
    admins[i] = yield call(getAdminAt, i);
  }
  yield put({
    type: universityAction.SET_ADMINS_LIST,
    number: num,
    account: admins,
  });
}

