import { expectSaga } from 'redux-saga-test-plan';
import { expect } from 'chai';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import reducer, { initialState, creators } from '../../../src/ducks/Evaluator';
import * as sagas from '../../../src/sagas/EvaluatorSaga';
import * as User from '../../../src/web3calls/User';
import * as Student from '../../../src/web3calls/Student';
import * as Exam from '../../../src/web3calls/Exam';

describe('Evaluator feature', () => {
  describe('Getting student data', () => {
    it('should throw an error if student does not exist', () => {
      const saga = expectSaga(sagas.getStudentData, '0x1', 0)
        .withReducer(reducer)
        .provide([
          [matchers.call.fn(Exam.getEnrolledContractAt, '0x1', 0), null],
        ]);
      saga.run().then(() => {
        expect(false).to.be.true;
      }).catch(() => {
        expect(true).to.be.true;
      });
    });
    it('should correctly pack all the student data when it exixsts', () => expectSaga(sagas.getStudentData, '0x1', 0)
      .withReducer(reducer, Object.assign({}, initialState, {
        studentList: {
          errored: false,
          loading: true,
          list: [],
        },
      }))
      .provide([
        [matchers.call.fn(Exam.getEnrolledContractAt, '0x1', 0), '0x0'],
        [matchers.call.fn(User.getName, '0x0'), 'Mario'],
        [matchers.call.fn(User.getSurname, '0x0'), 'Rossi'],
        [matchers.call.fn(Student.getIndexOfExam, '0x0', '0x1'), 5],
        [matchers.call.fn(Student.getExamValuationAt, '0x0', '0x1'), 23],
      ])
      .hasFinalState(Object.assign({}, initialState, {
        studentList: {
          loading: true,
          errored: false,
          list: [{
            name: 'Mario',
            surname: 'Rossi',
            studentAddress: '0x0',
            studentIndex: 0,
            vote: 23,
          }],
        },
      }))
      .run());
  });
  describe('getting student list', () => {
    it('should gently if getting one student fail', () => expectSaga(sagas.getList, '0x0')
      .withReducer(reducer)
      .provide([
        [matchers.call.fn(Exam.getEnrolledNumber, '0x0'), 1],
        [matchers.call.fn(sagas.getStudentData, '0x0', 0), throwError(new Error())],
      ])
      .hasFinalState(Object.assign(
        {},
        initialState,
        {
          studentList: {
            errored: true,
            loading: false,
            list: [],
          },
        },
      ))
      .run())
    it('should correctly retrive an empty list', () => expectSaga(sagas.getList, '0x0')
      .withReducer(reducer)
      .provide([
        [matchers.call.fn(Exam.getEnrolledNumber, '0x0'), 0],
      ])
      .hasFinalState(initialState)
      .run())
    it('should correctly retrive a list', () => expectSaga(sagas.getList, '0x0')
      .provide({
        call: (effect, next) => {
          const students = ['primo', 'secondo'];
          if (effect.fn === Exam.getEnrolledNumber) return 2;
          if (effect.fn === sagas.getStudentData) {
            return 0;
          }
          return next();
        }
      })
      .put(creators.listIsLoading())
      .put(creators.listHasFinished())
      .run())
  });
});
