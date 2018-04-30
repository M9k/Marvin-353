import { call, put, fork, all, takeLatest, takeEvery } from 'redux-saga/effects';
import * as User from '../web3calls/User';
import * as Exam from '../web3calls/Exam';
import * as UniversityExam from '../web3calls/UniversityExam';

const actionType = type => `marvin/ManageExamsSaga/${type}`;
const ADD_NEW_EXAM = actionType('ADD_NEW_EXAM');
const GET_ALL_EXAMS = actionType('GET_ALL_EXAMS');
const GET_EXAMS_BY_COURSE = actionType('GET_EXAMS_BY_COURSE');
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
  };
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
export function* associateProfessor(examAddress, teacherAddress) {
  yield call(UniversityExam.associateTeacherToExam, teacherAddress, examAddress);
}
export function* addNewExam({ courseAddress, name, credits, mandatory }){

}
export function* getAllExams({ solarYear }){

}
export function* getExamsByCurse({ courseAddress }){

}
export function* getTeachers() {

}
export function* associateProfessorToExam() {

}
export function* associateProfessorToCourseExam() {

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
  getAllExamsAction: solarYear => (
    { type: GET_ALL_EXAMS, solarYear }
  ),
  getExamsByCourseAction: courseAddress => (
    { type: GET_EXAMS_BY_COURSE, courseAddress }
  ),
  getTeachers: () => (
    { type: GET_TEACHERS }
  ),
  associateProfessorToExamAction: (examAddress, teacherAddress) => (
    { type: APTE, examAddress, teacherAddress }
  ),
  associateProfessorToCourseExamAction: (examAddress, teacherAddress) => (
    { type: APTCE, examAddress, teacherAddress }
  ),
};

export default function* handler() {
  yield [
    fork(takeEvery, ADD_NEW_EXAM, addNewExams),
    fork(takeLatest, GET_ALL_EXAMS, getAllExams),
    fork(takeLatest, GET_EXAMS_BY_COURSE, getExamsByCourse),
    fork(takeLatest, GET_TEACHERS, getTeachers),
    fork(takeEvery, APTE, associateProfessorToExam),
    fork(takeEvery, APTCE, associateProfessorToCourseExam),
  ];
}
