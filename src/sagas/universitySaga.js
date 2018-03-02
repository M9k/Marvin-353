import { call, put } from 'redux-saga/effects';
import { universityAction } from '../reducers/university';
import numAdmin from '../web3calls/numAdmin';
import addAdminWeb3 from '../web3calls/addAdmin';
import getAdminWeb3 from '../web3calls/getAdmin';
// import getAdmin from '../web3calls/getAdmin';

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

export function* getAdmin(action) {
  console.log(Number(action.number));
  // console.log(action.account);
  const num = Number(action.number);
  const admin = yield call(getAdminWeb3, num);
  console.log(admin);
  /*
  yield put({
    type: universityAction.GET_ADMIN,
    number: num,
    account: Number(admin),
  });
  */
}

