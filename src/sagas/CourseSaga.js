import { call, put, fork, all, takeLatest, takeEvery } from 'redux-saga/effects';
import { creators as actionCreators } from '../ducks/Course';
import { getCourseNumber, getCourseContractAt, addNewCourse } from '../web3calls/Year';
import { getAcademicYearNumber, getAcademicYearContractAt, getAcademicYearContractByYear } from '../web3calls/UniversityYear';
import { getName, getSolarYear } from '../web3calls/Course';

const actionType = type => `marvin/CourseSaga/${type}`;

export const GET_ALL_COURSES = actionType('GET_ALL_COURSES');
export const ADD_NEW_COURSE = actionType('ADD_NEW_COURSE');
export const GET_COURSES_BY_YEAR = actionType('GET_COURSES_BY_YEAR');

export function* getCoursesByYear(year) { // dato un anno preciso
  yield put(actionCreators.listIsLoading());
  try {
    const academicYearContract = yield call(getAcademicYearContractByYear, year);
    let num = yield call(getCourseNumber, academicYearContract);
    num = Number(num);
    const apiCalls = Array(num).fill().map((_, i) => call(getCourseContractAt, i));
    const contracts = yield all(apiCalls);
    const apiNameCalls = Array(num).fill.map((_, i) => call(getName, contracts[i]));
    const names = yield all(apiNameCalls);
    const apiYearCalls = Array(num).fill.map((_, i) => call(getSolarYear, contracts[i]));
    const years = yield all(apiYearCalls);
    const courses = Array(num).fill.map((_, i) => ({
      name: names[i],
      year: years[i],
    }));
    yield put(actionCreators.setCoursesByYearList(courses));
  } catch (e) {
    console.log('Failed!');
    yield put(actionCreators.listHasErrored());
  }
}

export function* getAllCourses() {
  yield put(actionCreators.listIsLoading());
  try {
    let num = yield call(getAcademicYearNumber);
    num = Number(num);
    const apiYearNumberCall = Array(num).fill.map((_, i) => call(getAcademicYearContractAt, i));
    const academicYearContracts = yield all(apiYearNumberCall);
    const apiCourseNumberCall = Array(num).fill.map((_, i) =>
      call(getCourseNumber, academicYearContracts[i]));
    const numberOfCourses = yield all(apiCourseNumberCall);
    const apiNameCall = Array(num).fill.map((_, i) => call(getName, numberOfCourses[i]));
    const names = yield all(apiNameCall);
    const apiYearCall = Array(num).fill.map((_, i) => call(getSolarYear, numberOfCourses[i]));
    const years = yield all(apiYearCall);
    const courses = Array(num).fill.map((_, i) => ({
      name: names[i],
      year: years[i],
    }));
    yield put(actionCreators.setCoursesList(courses));
  } catch (e) {
    console.log('Failed!');
    yield put(actionCreators.listHasErrored());
  }
}

export function* addCourse(action) {
  yield put(actionCreators.listIsLoading());
  try {
    const contract = yield call(getAcademicYearContractByYear, action.year);
    yield call(addNewCourse, contract, action.name, action.credits);
    yield put(actionCreators.pushNewCourse({
      address: contract,
      name: action.name,
      credits: action.credits,
    }));
  } catch (e) {
    console.log('Failed!');
    yield put(actionCreators.listHasErrored());
  }
}

export const creators = {
  getAllCoursesAction: () => (
    { type: GET_ALL_COURSES }
  ),
  addNewCourseAction: (year, name, credits) => (
    {
      type: ADD_NEW_COURSE, year, name, credits,
    }
  ),
  getCoursesByYearAction: year => (
    { type: GET_COURSES_BY_YEAR, year }
  ),
};

export default function* handler() {
  yield [
    fork(takeEvery, ADD_NEW_COURSE, addCourse),
    fork(takeLatest, GET_ALL_COURSES, getAllCourses),
    fork(takeLatest, GET_COURSES_BY_YEAR, getCoursesByYear),
  ];
}
