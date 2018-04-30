import { put, call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import * as sagas from '../../src/sagas/ManageExamsSaga';
import * as Exam from '../../src/web3calls/Exam';
import * as User from '../../src/web3calls/User';
import * as UniversityExam from '../../src/web3calls/UniversityExam';
import * as Course from '../../src/web3calls/Course';

describe('ManageExamsSaga', () => {
  function* sagaStub(saga, address) {
    try {
      const data = yield call(saga, address);
      yield put((data === undefined ? 'ok' : data));
    } catch (e) {
      console.log(e);
      yield put('error');
    }
  }
  describe('getExamData', () => {
    it('should retrieve the correct data', () => expectSaga(sagaStub, sagas.getExamData, '0')
      .provide([
        [matchers.call.fn(Exam.getName, '0'), 'Analisi Matematica'],
        [matchers.call.fn(Exam.getCredits, '0'), 12],
        [matchers.call.fn(Exam.getObligatoriness, '0'), true],
        [matchers.call.fn(Exam.getTeacherContract, '0'), 'sart'],
        [matchers.call.fn(sagas.getTeacherData, 'sart'), {
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
    it('should not catch the error if something goes wrong', () => expectSaga(sagaStub, sagas.getExamData, '0')
      .provide([
        [matchers.call.fn(Exam.getName, '0'), throwError(new Error())],
      ])
      .put('error')
      .run());
  });
  describe('getTeacherData', () => {
    it('should retrieve the correct data', () => expectSaga(sagaStub, sagas.getTeacherData, 'sart')
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
    it('should not catch the error if something goes wrong', () => expectSaga(sagaStub, sagas.getTeacherData, 'sart')
      .provide([
        [matchers.call.fn(User.getName, 'sart'), throwError(new Error())],
      ])
      .put('error')
      .run());
  });
  describe('associateProfessor', () => {
    it('should not crash when everything goes right', () => expectSaga(sagaStub, sagas.associateProfessor, '1', '2')
      .provide([
        [matchers.call.fn(UniversityExam.associateTeacherToExam, '1', '2'), true],
      ])
      .put('ok')
      .run());
    it('should not catch the error if something goes wrong', () => expectSaga(sagaStub, sagas.associateProfessor, '1', '2')
      .provide([
        [matchers.call.fn(UniversityExam.associateTeacherToExam, '1', '2'), throwError(new Error())],
      ])
      .put('error')
      .run());
  });
  describe('getCourseExamsList', () => {
    it('should retrive an empty list', () => expectSaga(sagaStub, sagas.getCourseExamsList, 'course')
      .provide([
        [matchers.call.fn(Course.getExamNumber, 'course'), 0],
      ])
      .put([])
      .run());
    it('should retrive a list with more than one element', () => expectSaga(sagaStub, sagas.getCourseExamsList, 'course')
      .provide({
        call: (effect, next) => {
          if (effect.fn === Course.getExamNumber) return 1;
          if (effect.fn === Course.getExamContractAt) {
            if (effect.args[1] === 0) return 'c1';
          }
          if (effect.fn === sagas.getExamData) {
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
    it('should retrive a list with more than one element', () => expectSaga(sagaStub, sagas.getCourseExamsList, 'course')
      .provide({
        call: (effect, next) => {
          if (effect.fn === Course.getExamNumber) return 2;
          if (effect.fn === Course.getExamContractAt) {
            if (effect.args[1] === 0) return 'c1';
            if (effect.args[1] === 1) return 'c2';
          }
          if (effect.fn === sagas.getExamData) {
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
    it('should not catch the error when something goes wrong', () => expectSaga(sagaStub, sagas.getCourseExamsList, 'course')
      .provide([
        [matchers.call.fn(Course.getExamNumber, 'course'), throwError(new Error())],
      ])
      .put('error')
      .run());
  });
  describe('getCourseData', () => {
    it('should retrieve the correct data', () => expectSaga(sagaStub, sagas.getCourseData, 'course')
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
    it('should not catch the error when something goes wrong', () => expectSaga(sagaStub, sagas.getCourseData, 'course')
      .provide([
        [matchers.call.fn(Course.getName, 'course'), throwError(new Error())],
      ])
      .put('error')
      .run());
  });
});
