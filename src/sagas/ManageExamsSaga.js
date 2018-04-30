import { call, put, fork, all } from 'redux-saga/effects';
import * as User from '../web3calls/User';
import * as Exam from '../web3calls/Exam';

const actionType = type => `marvin/ManageExamsSaga/${type}`;
const ADD_NEW_EXAM = actionType('ADD_NEW_EXAM');
const GET_ALL_EXAMS = actionType('GET_ALL_EXAMS');
const GET_EXAMS_BY_COURSE = actionType('GET_EXAM_BY_COURSE');
const GET_TEACHERS = actionType('GET_TEACHERS');
const APTCE = actionType('ASSOCIATE_PROFESSOR_TO_COURSE_EXAM');
const APTE = actionType('ASSOCIATE_PROFESSOR_TO_EXAM');

export function* getTeacherData(teacherAddress) {
  const dataFetch = [
    call(User.getName, teacherAddress),
    call(User.getSurname, teacherAddress),
  ];
  const [name, surname] = yield all(dataFetch);
  return {
    address: teacherAddress,
    name,
    surname,
  }
}
export function* getExamData(examAddress) {
  const address = examAddress;
  const dataFetch = [
    call(Exam.getName, address),
    call(Exam.getCredits, address),
    call(Exam.getObligatoriness, address),
    call(Exam.getTeacherContract, address),
  ];
  const [name, credits, mandatory, teacherAddress] = yield all(dataFetch);
  const teacherData = yield call(getTeacherData, teacherAddress);
  return {
    address,
    name,
    credits,
    mandatory,
    teacherAddress,
    teacherName: teacherData.name,
    teacherSurname: teacherData.surname,
  };
}
export const creators = {
  addNewExamAction: (courseAddress, name, credits, mandatory) => (
    {
      type: ADD_NEW_EXAM,
      courseAddress,
      name,
      credits,
      mandatory,
    }
  ),
};

export default function* handler() {
  yield [];
}
