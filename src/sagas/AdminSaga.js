import { call, put, fork, all, takeEvery, takeLatest } from 'redux-saga/effects';
import { creators as actionCreators } from '../ducks/Admin';
import {
  getStudentContractAddressAt, getStudentNumber, getNotApprovedStudentNumber,
  getNotApprovedStudentContractAddressAt,
  confirmStudent, removeStudent,
} from '../web3calls/UniversityStudent';

import {
  getTeacherContractAddressAt, getTeacherNumber,
  getNotApprovedTeacherNumber, getNotApprovedTeacherContractAddressAt,
  confirmTeacher, removeTeacher,
} from '../web3calls/UniversityTeacher';


const actionType = type => `marvin/AdminSaga/${type}`;

export const GET_STUDENTS_LIST = actionType('GET_STUDENTS_LIST');
export const GET_TEACHERS_LIST = actionType('GET_TEACHERS_LIST');
export const GET_PENDING_STUDENTS_LIST = actionType('GET_PENDING_STUDENTS_LIST');
export const GET_PENDING_TEACHERS_LIST = actionType('GET_PENDING_TEACHERS_LIST');
export const APPROVE_USER = actionType('APPROVE_USER');
export const DELETE_USER = actionType('DELETE_USER');

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
    const pendingTeachers = yield all(apiCalls);
    yield put(actionCreators.setPendingTeachersList(pendingTeachers));
  } catch (e) {
    console.log('Failed!');
    yield put(actionCreators.listHasErrored());
  }
}

export function* approveUser(action) {
  yield put(actionCreators.listIsLoading());
  try {
    if (action.role === 14.0) {
      yield call(confirmStudent, action.address);
    } else if (action.role === 13) {
      yield call(confirmTeacher, action.address);
    }
    yield put(actionCreators.approveUser(action.address));
  } catch (e) {
    console.log('Failed!');
    yield put(actionCreators.listHasErrored());
  }
}

export function* deleteUser(action) {
  yield put(actionCreators.listIsLoading());
  try {
    if (action.role === 14.0) {
      yield call(removeStudent, action.address);
    } else if (action.role === 13) {
      yield call(removeTeacher, action.address);
    }
    yield put(actionCreators.removeUser(action.address));
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
  approveUserAction: address => (
    { type: APPROVE_USER, address }
  ),
  removeUserAction: address => (
    { type: DELETE_USER, address }
  ),
};

export default function* handler() {
  yield [
    fork(takeEvery, DELETE_USER, deleteUser),
    fork(takeEvery, APPROVE_USER, approveUser),
    fork(takeLatest, GET_STUDENTS_LIST, getAllStudents),
    fork(takeLatest, GET_TEACHERS_LIST, getAllTeachers),
    fork(takeLatest, GET_PENDING_STUDENTS_LIST, getPendingStudents),
    fork(takeLatest, GET_PENDING_TEACHERS_LIST, getPendingTeachers),
  ];
}