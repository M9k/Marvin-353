import { call, put, takeLatest, fork, spawn } from 'redux-saga/effects';
import { creators as sessionAction } from '../ducks/Session';
import { getRole, getData } from '../web3calls/Session';
import AccountTypes from '../util/logic/AccountEnum';
import { getStudentContractFromPublicAddress } from '../web3calls/UniversityStudent';
import { getTeacherContractFromPublicAddress } from '../web3calls/UniversityTeacher';

const actionType = action => (`marvin/SessionSaga/${action}`);

const LOGIN = actionType('LOGIN');
const UPDATE = actionType('UPDATE');

export function* retrieveData(role) {
  yield put(sessionAction.dataLoading());
  try {
    const userData = yield call(getData, role);
    yield put(sessionAction.setData(userData));
  } catch (e) {
    console.log('Failed!');
    yield put(sessionAction.setData(null, true));
  }
}

export function* performLogin() {
  yield put(sessionAction.roleLoading());
  try {
    const userType = yield call(getRole);
    const role = Number(userType);
    if (role === AccountTypes.TEACHER) {
      const contract = yield call(getTeacherContractFromPublicAddress, web3.eth.accounts[0]);
      yield put(sessionAction.setContract(contract));
    }
    if (role === AccountTypes.STUDENT) {
      const contract = yield call(getStudentContractFromPublicAddress, web3.eth.accounts[0]);
      yield put(sessionAction.setContract(contract));
    }
    yield put(sessionAction.setRole(role));
    yield spawn(retrieveData, role);
  } catch (e) {
    console.log('Failed!');
    yield put(sessionAction.setRole(null, true));
  }
}

export const creators = {
  loginAction: () => (
    { type: LOGIN }
  ),
  updateData: () => (
    { type: UPDATE }
  ),
};

export default function* handler() {
  return yield [
    fork(takeLatest, LOGIN, performLogin),
    fork(takeLatest, UPDATE, retrieveData),
  ];
}
