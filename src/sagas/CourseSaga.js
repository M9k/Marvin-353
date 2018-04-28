import { call, put, fork, all, takeLatest, takeEvery } from 'redux-saga/effects';
import { creators as actionCreators } from '../ducks/Course';
import { getCourseNumber, getCourseContractAt, addNewCourse } from '../web3calls/Year';

const actionType = type => `marvin/CourseSaga/${type}`;

export const GET_ALL_COURSES = actionType('GET_ALL_COURSES');
export const ADD_NEW_COURSE = actionType('ADD_NEW_COURSE');

export function* getAllCourses() {
  yield put(actionCreators.listIsLoading());
  try {
    let num = yield call(getCourseNumber);
    num = Number(num);
    const apiCalls = Array(num).fill().map((_, i) => call(getCourseContractAt, i));
    const courses = yield all(apiCalls);
    yield put(actionCreators.setCoursesList(courses));
  } catch (e) {
    console.log('Failed!');
    yield put(actionCreators.listHasErrored());
  }
}

export function* addCourse(action) {
  yield put(actionCreators.listIsLoading());
  try {
    yield call(addNewCourse, action.address); // TODO va action.name e action.creditsForGraduation?
    yield put(actionCreators.pushNewCourse(action.address));
  } catch (e) {
    console.log('Failed!');
    yield put(actionCreators.listHasErrored());
  }
}

export const creators = {
  getAllCoursesAction: () => (
    { type: GET_ALL_COURSES }
  ),
  addNewCourseAction: address => (
    { type: ADD_NEW_COURSE, address }
  ),
};

export default function* handler() {
  yield [
    fork(takeEvery, ADD_NEW_COURSE, addCourse),
    fork(takeLatest, GET_ALL_COURSES, getAllCourses),
  ];
}
