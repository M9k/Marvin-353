import { call, put, fork, all } from 'redux-saga/effects';
import { creators as actionCreators } from '../ducks/Evaluator';
import * as User from '../web3calls/User';
import * as Student from '../web3calls/Student';
import * as Exam from '../web3calls/Exam';

const actionType = type => `marvin/EvaluatorSaga/${type}`;

export function* getStudentData(examAddress, studentIndex) {
  const studentAddress = yield call(Exam.getEnrolledContractAt, studentIndex);
  if (studentAddress === null) throw new Error();
  const [studentName, studentSurname, examIndex] = yield all([
    call(User.getName, studentAddress),
    call(User.getSurname, studentAddress),
    call(Student.getIndexOfExam, studentAddress, examAddress)
  ]);
  const vote = yield call(Student.getExamValuationAt, studentAddress, examIndex);
  yield put(actionCreators.pushStudent({
    name: studentName,
    surname: studentSurname,
    studentAddress,
    studentIndex,
    vote,
  }));
}
export function* getList(examAddress) {
  yield put(actionCreators.listIsLoading());
  try {
    const studentNumber = yield call(Exam.getEnrolledNumber, examAddress);
    const studentFetches = Array(Number(studentNumber)).fill().map((_, index) => (
      call(getStudentData, examAddress, index)
    ));
    yield all(studentFetches);
    yield put(actionCreators.listHasFinished());
  } catch (e) {
    yield put(actionCreators.listHasErrored());
  }
}
export function* assignVote(teacherAddress, examIndex, studentIndex, vote) {

}

export const creators = {};

export default function* handler() {
  yield [];
}
