import { call, put, fork, all, takeLatest, takeEvery } from 'redux-saga/effects';
import { creators as CourseCreators } from '../ducks/CourseExams';
import { creators as TeacherCreators } from '../ducks/TeachersList';
import { creators as ExamsCreators } from '../ducks/ExamsList';
import * as User from '../web3calls/User';
import * as Exam from '../web3calls/Exam';
import * as UniversityExam from '../web3calls/UniversityExam';
import * as UniversityYear from '../web3calls/UniversityYear';
import * as Year from '../web3calls/Year';
import * as Course from '../web3calls/Course';
import * as UniversityTeacher from '../web3calls/UniversityTeacher';

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
export function* getCourseData(courseAddress) {
  const dataFetch = [
    call(Course.getName, courseAddress),
    call(Course.getSolarYear, courseAddress),
  ];
  const [courseName, solarYear] = yield all(dataFetch);
  return {
    courseName,
    courseAddress,
    solarYear: Number(solarYear),
  };
}
export function* getCourseExamsList(courseAddress) {
  const courseNumber = yield call(Course.getExamNumber, courseAddress);
  const examsAddressFetch = Array(Number(courseNumber)).fill().map((_, id) => (
    call(Course.getExamContractAt, courseAddress, id)
  ));
  const examsAddresses = yield all(examsAddressFetch);
  const examDataFetch = examsAddresses.map(addr => (
    call(getExamData, addr)
  ));
  const examsData = yield all(examDataFetch);
  return examsData;
}
export function* addNewExam({ courseAddress, name, credits, mandatory }){

}
export function* getAllExams({ solarYear }) {
  try {
    yield put(ExamsCreators.listIsLoading());
    const yearAddress = yield call(UniversityYear.getAcademicYearContractByYear, solarYear);
    const courseCount = yield call(Year.getCourseNumber, yearAddress);
    const coursesFetch = Array(Number(courseCount)).fill().map((_, id) => (
      call(Year.getCourseContractAt, yearAddress, id)
    ));
    const exams = [];
    const coursesAddresses = yield all(coursesFetch);
    const examsFetch = coursesAddresses.map(courseAddress => (
      call(getCourseExamsList, courseAddress)
    ));
    const coursesDataFetch = coursesAddresses.map(courseAddress => (
      call(getCourseData, courseAddress)
    ));
    const examsByCourse = yield all(examsFetch);
    const coursesData = yield all(coursesDataFetch);
    for (let courseIndex = 0; courseIndex < coursesData.length; courseIndex += 1) {
      for (let examIndex = 0; examIndex < examsByCourse[courseIndex].length; examIndex += 1) {
        exams.push(Object.assign(
          {},
          coursesData[courseIndex],
          examsByCourse[courseIndex][examIndex],
        ));
      }
    }
    yield put(ExamsCreators.setList(exams));
  } catch (e) {
    console.log(e);
    yield put(ExamsCreators.listHasErrored());
  }
}
export function* getExamsByCourse({ courseAddress }) {
  try {
    yield put(CourseCreators.listIsLoading());
    const examsList = yield call(getCourseExamsList, courseAddress);
    yield put(CourseCreators.setList(examsList));
  } catch (e) {
    yield put(CourseCreators.listHasErrored());
  }
}
export function* getTeachers() {
  try {
    yield put(TeacherCreators.listIsLoading());
    const teacherCount = yield call(UniversityTeacher.getTeacherNumber);
    const teacherAddressFetch = Array(Number(teacherCount)).fill().map((_, id) => (
      call(UniversityTeacher.getTeacherContractAddressAt, id)
    ));
    const teacherAddresses = yield all(teacherAddressFetch);
    const teacherDataFetch = teacherAddresses.map(address => call(getTeacherData, address));
    const teachersData = yield all(teacherDataFetch);
    yield put(TeacherCreators.setList(teachersData));
  } catch (e) {
    yield put(TeacherCreators.listHasErrored());
  }
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
    fork(takeEvery, ADD_NEW_EXAM, addNewExam),
    fork(takeLatest, GET_ALL_EXAMS, getAllExams),
    fork(takeLatest, GET_EXAMS_BY_COURSE, getExamsByCourse),
    fork(takeLatest, GET_TEACHERS, getTeachers),
    fork(takeEvery, APTE, associateProfessorToExam),
    fork(takeEvery, APTCE, associateProfessorToCourseExam),
  ];
}
