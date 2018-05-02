import { call, put, fork, all, takeEvery, takeLatest } from 'redux-saga/effects';
import { creators as actionCreators } from '../ducks/Student';
import * as studentExams from '../web3calls/Student';
import { getExamNumber, getExamContractAt } from '../web3calls/Course';
import getCredits from '../web3calls/Exam';
import getExamData from './helpers/getters';

const actionType = type => `marvin/StudentSaga/${type}`;

export const GET_ENROLLED_EXAMS = actionType('GET_ENROLLED EXAMS');
export const GET_OPTIONAL_EXAMS = actionType('GET_OPTIONAL_EXAMS');
export const ENROLL_TO_AN_EXAM = actionType('ENROLL_TO_AN_EXAM');
export const GET_CREDITS = actionType('GET_CREDITS');


export function* getEnrolledExams(action) {
  yield put(actionCreators.listIsLoading());
  try {
    let num = yield call(getExamNumber, action.address);
    num = Number(num);
    const apiExamContractCall = Array(num).fill().map((_, i) =>
      call(studentExams.getExamContractAt, i));
    const examsContract = yield all(apiExamContractCall);
    const apiExamDataCall = Array(num).fill().map((_, i) => call(getExamData, examsContract[i]));
    const examsData = yield all(apiExamDataCall);
    yield put(actionCreators.setEnrolledExams, examsData);
  } catch (e) {
    console.log('failed to get enrolled list');
    yield put(actionCreators.listHasErrored());
  }
}

export function* getOptionalExams(action) {
  yield put(actionCreators.listIsLoading());
  try {
    const courseContract = yield call(studentExams.getCourseContract, action.address);
    let num = yield call(getExamNumber, courseContract);
    num = Number(num);
    const apiContractCall = Array(num).fill().map((_, i) => call(getExamContractAt, i));
    const contracts = yield all(apiContractCall);
    const apiExamsCall = Array(num).fill().map((_, i) => call(getExamData, contracts[i]));
    const examsData = yield all(apiExamsCall);
    examsData.filter(() => examsData.mandatory !== 1); // filter the exams that are not optional
    yield put(actionCreators.setOptionalExams(examsData));
  } catch (e) {
    console.log('failed to get the oprional exams');
    yield put(actionCreators.listHasErrored());
  }
}

export function* getExamsCredits(action) {
  try {
    let num = yield call(studentExams.getExamNumber, action.address);
    num = Number(num);
    const apiContractCall = Array(num).fill().map((_, i) =>
      call(studentExams.getExamContractAt, i));
    const contracts = yield all(apiContractCall);
    const apiExamsValutationCall = Array(num).fill().map((_, i) =>
      call(studentExams.getExamValuationAt, contracts[i]));
    const valutations = yield all(contracts, apiExamsValutationCall);
    valutations.filter(() => valutations > 17);
    const apiCreditsCall = Array(num).fill().map((_, i) =>
      call(getCredits, valutations.contracts[i]));
    let credits = yield all(apiCreditsCall);
    credits = credits.reduce((a, b) => a + b, 0);
    yield put(actionCreators.setCredits, credits);
  } catch (e) {
    console.log('failed to get credits');
  }
}

export function* enrollToExam(action) {
  try {
    let index = yield call(studentExams.getIndexOfExam, action.address);
    index = Number(index);
    yield call(studentExams.enrollToOptionalExam, action.address, index);
    const exam = yield call(getExamData, action.address);
    yield put(actionCreators.pushNewSubscription, exam);
  } catch (e) {
    console.log('failed to enroll to the exam');
  }
}


export const creators = {
  getEnrolledExamsAction: address => (
    { type: GET_ENROLLED_EXAMS, address }
  ),
  getOptionalExamsAciotn: address => (
    { type: GET_OPTIONAL_EXAMS, address }
  ),
  enrollToExamAction: address => ( // exam address
    { type: ENROLL_TO_AN_EXAM, address }
  ),
};

export default function* handler() {
  yield [
    fork(takeLatest, GET_ENROLLED_EXAMS, getEnrolledExams),
    fork(takeLatest, GET_OPTIONAL_EXAMS, getOptionalExams),
    fork(takeLatest, GET_CREDITS, getExamsCredits),
    fork(takeEvery, ENROLL_TO_AN_EXAM, enrollToExam()),
  ];
}
