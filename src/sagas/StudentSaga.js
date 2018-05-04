import { call, put, fork, all, takeEvery, takeLatest } from 'redux-saga/effects';
import { creators as actionCreators } from '../ducks/Student';
import * as studentExams from '../web3calls/Student';
import { getExamNumber, getExamContractAt, getCreditsToGraduate } from '../web3calls/Course';
import { getCredits } from '../web3calls/Exam';
import { getExamData } from './helpers/getters';

const actionType = type => `marvin/StudentSaga/${type}`;

export const GET_ENROLLED_EXAMS = actionType('GET_ENROLLED EXAMS');
export const GET_OPTIONAL_EXAMS = actionType('GET_OPTIONAL_EXAMS');
export const ENROLL_TO_AN_EXAM = actionType('ENROLL_TO_AN_EXAM');
export const GET_CREDITS = actionType('GET_CREDITS');


export function* getEnrolledExams(action) {
  yield put(actionCreators.listIsLoading());
  try {
    let num = yield call(studentExams.getExamNumber, action.address);
    num = Number(num);
    const apiExamContractCall = Array(num).fill().map((_, i) =>
      call(studentExams.getExamContractAt, action.address, i));
    const examsContract = yield all(apiExamContractCall);
    const apiExamDataCall = Array(num).fill().map((_, i) => call(getExamData, examsContract[i]));
    const examsData = yield all(apiExamDataCall);
    // console.log(examsData);
    const apiExamValuationCall = Array(num).fill().map((_, i) =>
      call(studentExams.getExamValuationAt, action.address, i));
    const examsValuation = (yield all(apiExamValuationCall)).map(x => (x === 0 ? null : x - 1));
    const apiExamSubscriptionCall = Array(num).fill().map((_, i) =>
      call(studentExams.getExamSubscriptionAt, action.address, i));
    const examsSubscription = yield all(apiExamSubscriptionCall);
    // console.log(examsValuation);

    const personalExamsData = Array(num).fill().map((_, i) => ({
      address: examsData[i].address,
      name: examsData[i].name,
      mandatory: examsData[i].mandatory,
      teacherAddress: examsData[i].teacherAddress,
      teacherName: examsData[i].teacherName,
      teacherSurname: examsData[i].teacherSurname,
      valuation: examsValuation[i],
      subscription: examsSubscription[i],
    }));
    // console.log(personalExamsData);

    yield put(actionCreators.setEnrolledExams(personalExamsData));
  } catch (e) {
    console.log('failed to get enrolled list');
    yield put(actionCreators.listHasErrored());
  }
}

// TODO!!!!
//
// serve recuperare il voto oppure filtriamo la lista sopra senza richiedere tutto di nuovo?
// comunque vada la lista sopra va presa persino nella home per sapere lo stato attuale
export function* getOptionalExams(action) {
  yield put(actionCreators.listIsLoading());
  try {
    const courseContract = yield call(studentExams.getCourseContract, action.address);
    let num = yield call(getExamNumber, courseContract);
    num = Number(num);
    const apiContractCall = Array(num).fill().map((_, i) =>
      call(getExamContractAt, action.address, i));
    const contracts = yield all(apiContractCall);
    const apiExamsCall = Array(num).fill().map((_, i) => call(getExamData, contracts[i]));
    let examsData = yield all(apiExamsCall);
    console.log(examsData);
    examsData = examsData.filter(x => x.mandatory === true); // filter the exams that are optional
    yield put(actionCreators.setOptionalExams(examsData));
  } catch (e) {
    console.log('failed to get the optional exams');
    yield put(actionCreators.listHasErrored());
  }
}

export function* getExamsCredits(action) {
  try {
    let num = yield call(studentExams.getExamNumber, action.address);
    num = Number(num);
    const apiContractCall = Array(num).fill().map((_, i) =>
      call(studentExams.getExamContractAt, action.address, i));
    const contracts = yield all(apiContractCall);
    const apiExamsValutationCall = Array(num).fill().map((_, i) =>
      call(studentExams.getExamValuationAt, action.address, contracts[i]));
    let valutations = yield all(apiExamsValutationCall);
    valutations = valutations.map((valutation, i) => ({
      valutation,
      contract: contracts[i],
    }));
    valutations.filter(x => x.valutation > 17);
    const apiCreditsCall = Array(num).fill().map((_, i) =>
      call(getCredits, valutations.contract[i]));
    let credits = yield all(apiCreditsCall);
    credits = credits.reduce((a, b) => a + b, 0);
    const courseContract = yield call(studentExams.getCourseContract, action.address);
    let graduationCredits = yield call(getCreditsToGraduate, courseContract);
    graduationCredits = Number(graduationCredits);
    yield put(actionCreators.setCredits(credits, graduationCredits));
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
  getOptionalExamsAction: address => (
    { type: GET_OPTIONAL_EXAMS, address }
  ),
  getCreditsAction: address => (
    { type: GET_CREDITS, address }
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
