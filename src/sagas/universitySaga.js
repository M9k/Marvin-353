import { call, put, takeEvery } from 'redux-saga/effects';
import { universityAction } from '../reducers/university';
import numAdmin from '../web3calls/numAdmin';
import addAdminWeb3 from '../web3calls/addAdmin';
// import getAdmin from '../web3calls/getAdmin';

export function* adminNumber() {
  const administratorNumber = yield call(numAdmin);
  yield put({ type: universityAction.ADMIN_NUMBER, adminNumber: Number(administratorNumber) });
}

export function* addAdmin(action) {
  try {
    yield call(addAdminWeb3, action.address);
  } catch (e) {
    console.log('Failed!');
  }
  // const nAdmin = yield call(numAdmin);
  // yield put({ type: universityAction.ADD_NEW_ADMIN, adminNumber: Number(nAdmin) });
}

