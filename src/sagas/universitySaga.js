import { call, put, all } from 'redux-saga/effects';
import * as actionCreators from '../modules/universityAdmin'
import numAdmin from '../web3calls/numAdmin';
import addAdminWeb3 from '../web3calls/addAdmin';
import removeAdminWeb3 from '../web3calls/removeAdmin';
import getAdminWeb3 from '../web3calls/getAdmin';

export const ADD_NEW_ADMIN = 'marvin/universitySaga/ADD_NEW_ADMIN';
export const REMOVE_ADMIN = 'marvin/universitySaga/REMOVE_ADMIN';
export const GET_ADMIN_NUMBER = 'marvin/universitySaga/GET_ADMIN_NUMBER';
export const GET_ALL_ADMINS = 'marvin/universitySaga/GET_ALL_ADMINS';

export function* adminNumber() {
  const administratorNumber = yield call(numAdmin);
  yield put(actionCreators.setAdminNumber(Number(administratorNumber)));
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
  yield put(actionCreators.setAdminsList(admins));
}

export const addNewAdminAction = address => (
  { type: ADD_NEW_ADMIN, address }
);
export const removeAdminAction = address => (
  { type: REMOVE_ADMIN, address }
);
export const getAdminNumberAction = () => (
  { type: GET_ADMIN_NUMBER }
);
export const getAllAdminsAction = () => (
  { type: GET_ALL_ADMINS }
);
