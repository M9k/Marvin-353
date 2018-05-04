import { call, put, fork, all, takeEvery, takeLatest } from 'redux-saga/effects';
import { creators as actionCreators } from '../ducks/Student';
import * as studentExams from '../web3calls/Student';
import { getCredits } from '../web3calls/Exam';
import { getCreditsToGraduate } from '../web3calls/Course';
import { getExamData } from './helpers/getters';

const actionType = type => `marvin/StudentSaga/${type}`;

export const GET_EXAMS = actionType('GET_EXAMS');
export const ENROLL_TO_AN_EXAM = actionType('ENROLL_TO_AN_EXAM');
export const GET_CREDITS = actionType('GET_CREDITS');


export function* getExamsAction(action) {
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

    yield put(actionCreators.setExams(personalExamsData));
  } catch (e) {
    console.log('failed to get enrolled list');
    yield put(actionCreators.listHasErrored());
  }
}

export function* getExamsCredits(action) {
  try {
    let num = yield call(studentExams.getExamNumber, action.address);
    num = Number(num);
    console.log('number of exams: ', num);
    const apiContractCall = Array(num).fill().map((_, i) =>
      call(studentExams.getExamContractAt, action.address, i));
    const contracts = yield all(apiContractCall);
    console.log('contracts: ', contracts);
    const apiExamsValutationCall = Array(num).fill().map((_, i) =>
      call(studentExams.getExamValuationAt, action.address, contracts[i]));
    let valutations = yield all(apiExamsValutationCall);
    console.log('valutations: ', valutations);
    valutations = valutations.map((valutation, i) => ({
      valutation,
      contract: contracts[i],
    }));
    console.log('valutations prima di filter: ', valutations);
    valutations.filter(x => x.valutation > 17);
    console.log('valutations dopo filter: ', valutations);
    const apiCreditsCall = Array(num).fill().map((_, i) =>
      call(getCredits, contracts[i]));
    let credits = yield all(apiCreditsCall);
    credits = credits.reduce((a, b) => a + b, 0);
    console.log('total credits: ', credits);
    const courseContract = yield call(studentExams.getCourseContract, action.address);
    console.log('courseContract: ', courseContract);
    let graduationCredits = yield call(getCreditsToGraduate, courseContract);
    graduationCredits = Number(graduationCredits);
    console.log('courseContractCredits: ', graduationCredits);
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
  getExamsAction: address => (
    { type: GET_EXAMS, address }
  ),
  enrollToExamAction: address => ( // exam address
    { type: ENROLL_TO_AN_EXAM, address }
  ),
  getCreditsAction: address => (
    { type: GET_CREDITS, address }
  ),
};

export default function* handler() {
  yield [
    fork(takeLatest, GET_EXAMS, getExamsAction),
    fork(takeLatest, GET_CREDITS, getExamsCredits),
    fork(takeEvery, ENROLL_TO_AN_EXAM, enrollToExam()),
  ];
}
