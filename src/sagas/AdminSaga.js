import { call, put, fork, all, takeEvery, takeLatest } from 'redux-saga/effects';
import { creators as actionCreators } from '../ducks/Admin';
import {
  getStudentContractAddressAt, getStudentNumber, getNotApprovedStudentNumber,
  getNotApprovedStudentContractAddressAt,
  confirmStudent, removeStudent, denyStudent,
} from '../web3calls/UniversityStudent';

import {
  getTeacherContractAddressAt, getTeacherNumber,
  getNotApprovedTeacherNumber, getNotApprovedTeacherContractAddressAt,
  confirmTeacher, removeTeacher, denyTeacher,
} from '../web3calls/UniversityTeacher';

import { getName, getSurname, getPublicAddress } from '../web3calls/User';

import { toText } from '../util/web3/textConverter';

import ROLES from '../util/logic/AccountEnum';


const actionType = type => `marvin/AdminSaga/${type}`;

export const GET_STUDENTS_LIST = actionType('GET_STUDENTS_LIST');
export const GET_TEACHERS_LIST = actionType('GET_TEACHERS_LIST');
export const GET_PENDING_STUDENTS_LIST = actionType('GET_PENDING_STUDENTS_LIST');
export const GET_PENDING_TEACHERS_LIST = actionType('GET_PENDING_TEACHERS_LIST');
export const APPROVE_USER = actionType('APPROVE_USER');
export const DELETE_USER = actionType('DELETE_USER');
export const DENY_USER = actionType('DENY_USER');

export function* getAllStudents() {
  yield put(actionCreators.listIsLoading());
  try {
    let num = yield call(getStudentNumber);
    num = Number(num);
    const apiCalls = Array(num).fill().map((_, i) => call(getStudentContractAddressAt, i));
    const students = yield all(apiCalls);
    yield put(actionCreators.setStudentsList(students));
  } catch (e) {
    console.log('Failed!');
    yield put(actionCreators.listHasErrored());
  }
}
// TODO ottenere anche nomi, cognomi, indirizzi e corsi(guardare getPendingTeachers)
export function* getPendingStudents() {
  yield put(actionCreators.listIsLoading());
  try {
    let num = yield call(getNotApprovedStudentNumber);
    num = Number(num);
    const apiCalls = Array(num).fill().map((_, i) =>
      call(getNotApprovedStudentContractAddressAt, i));
    const pendingStudents = yield all(apiCalls);
    yield put(actionCreators.setPendingStudentsList(pendingStudents));
  } catch (e) {
    console.log('Failed!');
    yield put(actionCreators.listHasErrored());
  }
}

// TODO ottenere anche nomi, cognomi ed indirizzi (guardare getPendingTeachers)
export function* getAllTeachers() {
  yield put(actionCreators.listIsLoading());
  try {
    let num = yield call(getTeacherNumber);
    num = Number(num);
    const apiCalls = Array(num).fill().map((_, i) => call(getTeacherContractAddressAt, i));
    const teachers = yield all(apiCalls);
    yield put(actionCreators.setTeachersList(teachers));
  } catch (e) {
    console.log('Failed!');
    yield put(actionCreators.listHasErrored());
  }
}

export function* getPendingTeachers() {
  yield put(actionCreators.listIsLoading());
  try {
    let num = yield call(getNotApprovedTeacherNumber);
    num = Number(num);
    const apiCalls = Array(num).fill().map((_, i) =>
      call(getNotApprovedTeacherContractAddressAt, i));
    const pendingTeachersContracts = yield all(apiCalls);
    const apiNameCalls = Array(num).fill().map(() =>
      call(getName, String(pendingTeachersContracts)));
    const pendingTeachersName = (yield all(apiNameCalls)).map(toText);
    const apiSurnameCalls = Array(num).fill().map(() =>
      call(getSurname, String(pendingTeachersContracts)));
    const pendingTeachersSurname = (yield all(apiSurnameCalls)).map(toText);
    const apiPublicAddressCalls = Array(num).fill().map(() =>
      call(getPublicAddress, String(pendingTeachersContracts)));
    const pendingTeachersPublicAddress = (yield all(apiPublicAddressCalls));
    const pendingTeachers = Array(num).fill().map((_, i) => ({
      contract: pendingTeachersContracts[i],
      address: pendingTeachersPublicAddress[i],
      name: pendingTeachersName[i],
      surname: pendingTeachersSurname[i],
    }));
    // console.log(pendingTeachers);
    yield put(actionCreators.setPendingTeachersList(pendingTeachers));
  } catch (e) {
    console.log('Failed!');
    yield put(actionCreators.listHasErrored());
  }
}

export function* approveUser(action) {
  yield put(actionCreators.listIsLoading());
  try {
    if (action.role === ROLES.UNCONFIRMED_STUDENT) {
      yield call(confirmStudent, action.address);
    } else if (action.role === ROLES.UNCONFIRMED_TEACHER) {
      yield call(confirmTeacher, action.address);
    }
    yield put(actionCreators.confirmUser(action.role, action.address));
  } catch (e) {
    console.log('Failed!');
    yield put(actionCreators.listHasErrored());
  }
}

export function* deleteUser(action) {
  yield put(actionCreators.listIsLoading());
  try {
    if (action.role === ROLES.STUDENT) {
      yield call(removeStudent, action.address);
    } else if (action.role === ROLES.TEACHER) {
      yield call(removeTeacher, action.address);
    }
    yield put(actionCreators.removeUser(action.role, action.address));
  } catch (e) {
    console.log('Failed!');
    yield put(actionCreators.listHasErrored());
  }
}

export function* denyUser(action) {
  yield put(actionCreators.listIsLoading());
  try {
    if (action.role === ROLES.UNCONFIRMED_STUDENT) {
      yield call(denyStudent, action.address);
    } else if (action.role === ROLES.UNCONFIRMED_TEACHER) {
      yield call(denyTeacher, action.address);
    }
    yield put(actionCreators.unconfirmUser(action.role, action.address));
  } catch (e) {
    console.log('Failed!');
    yield put(actionCreators.listHasErrored());
  }
}

export const creators = {
  getAllStudentsAction: () => (
    { type: GET_STUDENTS_LIST }
  ),
  getAllTEachersAction: () => (
    { type: GET_TEACHERS_LIST }
  ),
  getPendingStudentsAction: () => (
    { type: GET_PENDING_STUDENTS_LIST }
  ),
  getPendingTEachersAction: () => (
    { type: GET_PENDING_TEACHERS_LIST }
  ),
  approveUserAction: (role, address) => (
    { type: APPROVE_USER, role, address }
  ),
  removeUserAction: (role, address) => (
    { type: DELETE_USER, role, address }
  ),
  denyUserAction: (role, address) => (
    { type: DENY_USER, role, address }
  ),
};

export default function* handler() {
  yield [
    fork(takeEvery, DELETE_USER, deleteUser),
    fork(takeEvery, DENY_USER, denyUser),
    fork(takeEvery, APPROVE_USER, approveUser),
    fork(takeLatest, GET_STUDENTS_LIST, getAllStudents),
    fork(takeLatest, GET_TEACHERS_LIST, getAllTeachers),
    fork(takeLatest, GET_PENDING_STUDENTS_LIST, getPendingStudents),
    fork(takeLatest, GET_PENDING_TEACHERS_LIST, getPendingTeachers),
  ];
}
