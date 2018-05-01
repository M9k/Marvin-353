import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import sagaStub from '../stubs';
import * as Getters from '../../../src/sagas/helpers/getters';
import * as Exam from '../../../src/web3calls/Exam';
import * as User from '../../../src/web3calls/User';
import * as Course from '../../../src/web3calls/Course';

describe('Getters', () => {
  describe('getExamData', () => {
    it('should retrieve the correct data', () => expectSaga(sagaStub, Getters.getExamData, '0')
      .provide([
        [matchers.call.fn(Exam.getName, '0'), 'Analisi Matematica'],
        [matchers.call.fn(Exam.getCredits, '0'), 12],
        [matchers.call.fn(Exam.getObligatoriness, '0'), true],
        [matchers.call.fn(Exam.getTeacherContract, '0'), 'sart'],
        [matchers.call.fn(Getters.getTeacherData, 'sart'), {
          name: 'Caterina',
          surname: 'Sartori',
        }],
      ])
      .put({
        address: '0',
        name: 'Analisi Matematica',
        credits: 12,
        mandatory: true,
        teacherAddress: 'sart',
        teacherName: 'Caterina',
        teacherSurname: 'Sartori',
      })
      .run());
    it('should not catch the error if something goes wrong', () => expectSaga(sagaStub, Getters.getExamData, '0')
      .provide([
        [matchers.call.fn(Exam.getName, '0'), throwError(new Error())],
      ])
      .put('error')
      .run());
  });
  describe('getTeacherData', () => {
    it('should retrieve the correct data', () => expectSaga(sagaStub, Getters.getTeacherData, 'sart')
      .provide([
        [matchers.call.fn(User.getName, 'sart'), 'Caterina'],
        [matchers.call.fn(User.getSurname, 'sart'), 'Sartori'],
      ])
      .put({
        address: 'sart',
        name: 'Caterina',
        surname: 'Sartori',
      })
      .run());
    it('should not catch the error if something goes wrong', () => expectSaga(sagaStub, Getters.getTeacherData, 'sart')
      .provide([
        [matchers.call.fn(User.getName, 'sart'), throwError(new Error())],
      ])
      .put('error')
      .run());
  });
  describe('getCourseExamsList', () => {
    it('should retrive an empty list', () => expectSaga(sagaStub, Getters.getCourseExamsList, 'course')
      .provide([
        [matchers.call.fn(Course.getExamNumber, 'course'), 0],
      ])
      .put([])
      .run());
    it('should retrive a list with more than one element', () => expectSaga(sagaStub, Getters.getCourseExamsList, 'course')
      .provide({
        call: (effect, next) => {
          if (effect.fn === Course.getExamNumber) return 1;
          if (effect.fn === Course.getExamContractAt) {
            if (effect.args[1] === 0) return 'c1';
          }
          if (effect.fn === Getters.getExamData) {
            if (effect.args[0] === 'c1') {
              return {
                address: 'c1',
                name: 'P1',
                credits: 10,
                mandatory: true,
                teacherAddress: 'gibbo',
                teacherName: 'Gilberto',
                teacherSurname: 'Filé',
              };
            }
          }
          return next();
        },
      })
      .put([{
        address: 'c1',
        name: 'P1',
        credits: 10,
        mandatory: true,
        teacherAddress: 'gibbo',
        teacherName: 'Gilberto',
        teacherSurname: 'Filé',
      }])
      .run());
    it('should retrive a list with more than one element', () => expectSaga(sagaStub, Getters.getCourseExamsList, 'course')
      .provide({
        call: (effect, next) => {
          if (effect.fn === Course.getExamNumber) return 2;
          if (effect.fn === Course.getExamContractAt) {
            if (effect.args[1] === 0) return 'c1';
            if (effect.args[1] === 1) return 'c2';
          }
          if (effect.fn === Getters.getExamData) {
            if (effect.args[0] === 'c1') {
              return {
                address: 'c1',
                name: 'P1',
                credits: 10,
                mandatory: true,
                teacherAddress: 'gibbo',
                teacherName: 'Gilberto',
                teacherSurname: 'Filé',
              };
            }
            if (effect.args[0] === 'c2') {
              return {
                address: 'c2',
                name: 'P2',
                credits: 10,
                mandatory: true,
                teacherAddress: 'ranzi',
                teacherName: 'Francesco',
                teacherSurname: 'Ranzato',
              };
            }
          }
          return next();
        },
      })
      .put([
        {
          address: 'c1',
          name: 'P1',
          credits: 10,
          mandatory: true,
          teacherAddress: 'gibbo',
          teacherName: 'Gilberto',
          teacherSurname: 'Filé',
        },
        {
          address: 'c2',
          name: 'P2',
          credits: 10,
          mandatory: true,
          teacherAddress: 'ranzi',
          teacherName: 'Francesco',
          teacherSurname: 'Ranzato',
        },
      ])
      .run());
    it('should not catch the error when something goes wrong', () => expectSaga(sagaStub, Getters.getCourseExamsList, 'course')
      .provide([
        [matchers.call.fn(Course.getExamNumber, 'course'), throwError(new Error())],
      ])
      .put('error')
      .run());
  });
  describe('getCourseData', () => {
    it('should retrieve the correct data', () => expectSaga(sagaStub, Getters.getCourseData, 'course')
      .provide([
        [matchers.call.fn(Course.getName, 'course'), 'Scienze Informatiche'],
        [matchers.call.fn(Course.getSolarYear, 'course'), '2017'],
      ])
      .put({
        courseAddress: 'course',
        courseName: 'Scienze Informatiche',
        solarYear: 2017,
      })
      .run());
    it('should not catch the error when something goes wrong', () => expectSaga(sagaStub, Getters.getCourseData, 'course')
      .provide([
        [matchers.call.fn(Course.getName, 'course'), throwError(new Error())],
      ])
      .put('error')
      .run());
  });
});
