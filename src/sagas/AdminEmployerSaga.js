import { call, put, all, fork, takeLatest, takeEvery } from 'redux-saga/effects';
import * as actionCreators from '../ducks/AdminEmployer';
import numAdmin from '../web3calls/numAdmin';
import addAdminWeb3 from '../web3calls/addAdmin';
import removeAdminWeb3 from '../web3calls/removeAdmin';
import getAdminWeb3 from '../web3calls/getAdmin';

export const REMOVE_ADMIN = 'marvin/universitySaga/REMOVE_ADMIN';
export const ADD_NEW_ADMIN = 'marvin/universitySaga/ADD_NEW_ADMIN';
export const GET_ALL_ADMINS = 'marvin/universitySaga/GET_ALL_ADMINS';

export function* addAdmin(action) {
  yield put(actionCreators.listIsLoading());
  try {
    yield call(addAdminWeb3, action.address);
    yield put(actionCreators.pushAdmin(action.address));
  } catch (e) {
    console.log('Failed!');
    yield put(actionCreators.listHasErrored());
  }
}
export function* removeAdmin(action) {
  yield put(actionCreators.listIsLoading());
  try {
    yield call(removeAdminWeb3, action.address);
    yield put(actionCreators.popAdmin(action.address));
  } catch (e) {
    console.log('Failed!');
    yield put(actionCreators.listHasErrored());
  }
}
export function* getAllAdmins() {
  yield put(actionCreators.listIsLoading());
  try {
    let num = yield call(numAdmin);
    num = Number(num);
    const apiCalls = Array(num).fill().map((_, i) => call(getAdminWeb3, i));
    const admins = yield all(apiCalls);
    yield put(actionCreators.setAdminsList(admins));
  }
  catch (e){
    console.log('Failed!');
    yield put(actionCreators.listHasErrored());
  }
}

export const addNewAdminAction = address => (
  { type: ADD_NEW_ADMIN, address }
);
export const removeAdminAction = address => (
  { type: REMOVE_ADMIN, address }
);
export const getAllAdminsAction = () => (
  { type: GET_ALL_ADMINS }
);

export default function* handler (){
  yield [
    fork(takeEvery, ADD_NEW_ADMIN, addAdmin),
    fork(takeEvery, REMOVE_ADMIN, removeAdmin),
    fork(takeLatest, GET_ALL_ADMINS, getAllAdmins),
  ]
}
