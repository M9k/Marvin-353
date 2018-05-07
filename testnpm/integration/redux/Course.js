
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import reducer, { creators } from '../../../src/ducks/Course';
import * as sagas from '../../../src/sagas/CourseSaga';
import * as Year from '../../../src/web3calls/Year';
import * as UniversityYear from '../../../src/web3calls/UniversityYear';
import * as Course from '../../../src/web3calls/Course';

const filledState = {
  loading: false,
  errored: false,
  coursesList: [
    {
      address: '0xf56a6c1cbf0d31a223a65c7c6a61ab0b2bd8f25f',
      name: 'ciao',
      year: 2018,
      credits: 180,
    },
  ],
};
describe('Course feature', () => {
  it('should add a course', () => expectSaga(sagas.addCourse, sagas.creators.addNewCourse(2018, 'ciao', 180))
    .withReducer(reducer)
    .provide([
      [matchers.call.fn(UniversityYear.getAcademicYearContractByYear), '0xf56a6c1cbf0d31a223a65c7c6a61ab0b2bd8f25f'],
      [matchers.call.fn(Year.addNewCourse), true],
    ])
    .hasFinalState({
      loading: false,
      errored: false,
      coursesList: [],
    })
    .put(creators.listIsLoading())
    .run());
  it('should\'t add a course if it\'s already in the list', () => expectSaga(sagas.addCourse, sagas.creators.addNewCourse(2018, 'ciao', 180))
    .withReducer(reducer, filledState)
    .provide([
      [matchers.call.fn(UniversityYear.getAcademicYearContractByYear), '0xf56a6c1cbf0d31a223a65c7c6a61ab0b2bd8f25f'],
      [matchers.call.fn(Year.addNewCourse), throwError(new Error())],
    ])
    .hasFinalState({
      loading: false,
      errored: true,
      coursesList: filledState.coursesList,
    })
    .put(creators.listIsLoading())
    .run());
  it('should get the couses list', () => expectSaga(sagas.getCourses, sagas.creators.getAllCourses())
    .withReducer(reducer, filledState)
    .provide({
      call: (effect, next) => {
        if (effect.fn === UniversityYear.getAcademicYearNumber) return 2;
        if (effect.fn === UniversityYear.getAcademicYearContractAt) {
          if (effect.args[0] === 0) return 'pluto';
          if (effect.args[0] === 1) return 'paperino';
        }
        if (effect.fn === Year.getCourseNumber) {
          if (effect.args[0] === 0) return '1';
          if (effect.args[0] === 1) return '2';
        }
        if (effect.fn === Year.getCourseContractAt) {
          if (effect.args[0] === 0) return 'qui';
          if (effect.args[0] === 1) return 'quo';
          if (effect.args[0] === 2) return 'qua';
        }
        if (effect.fn === Course.getName) {
          if (effect.args[0] === 0) return 'topolino';
          if (effect.args[0] === 1) return 'troppolino';
          if (effect.args[0] === 1) return 'paperone';
        }
        if (effect.fn === Course.getCreditsToGraduate) {
          if (effect.args[0] === 0) return '180';
          if (effect.args[0] === 1) return '300';
          if (effect.args[0] === 2) return '120';
        }
        return next();
      },
    })
    .put(creators.listIsLoading())
    .run());
});
