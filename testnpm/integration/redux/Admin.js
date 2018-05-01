import { expectSaga } from 'redux-saga-test-plan'; // eslint-disable-line import/no-extraneous-dependencies
import * as matchers from 'redux-saga-test-plan/matchers'; // eslint-disable-line import/no-extraneous-dependencies
import { throwError } from 'redux-saga-test-plan/providers'; // eslint-disable-line import/no-extraneous-dependencies
import reducer, { creators } from '../../../src/ducks/Admin';
import * as sagas from '../../../src/sagas/AdminSaga';
import GentlyFail from './GentlyFail';
import * as Students from '../../../src/web3calls/UniversityStudent';
// import * as Admin from '../../../src/web3calls/UniversityAdmin';
import * as Teachers from '../../../src/web3calls/UniversityTeacher';
import ROLES from '../../../src/util/logic/AccountEnum';


const features = [sagas.getAllTeachers, sagas.getAllStudents,
  sagas.getPendingStudents, sagas.getPendingTeachers];

const failedState = {
  loading: false,
  errored: true,
  studentsList: [],
  teachersList: [],
  pendingStudentsList: [],
  pendingTeachersList: [],
};

const filledState = {
  loading: false,
  errored: false,
  studentsList: ['pluto', 'pippo'],
  teachersList: ['topolino', 'paperino'],
  pendingStudentsList: ['qui', 'quo', 'qua'],
  pendingTeachersList: ['zio_paperone', 'archimede'],
};

describe('Admin approve/remove', () => {
  describe('Confirm a student', () => {
    it('should confirm the selected student', () => expectSaga(sagas.approveUser, { role: ROLES.UNCONFIRMED_STUDENT, address: 'qui' })
      .withReducer(reducer, filledState)
      .provide([
        [matchers.call.fn(Students.confirmStudent), true],
      ])
      .hasFinalState({
        loading: false,
        errored: false,
        studentsList: ['pluto', 'pippo', 'qui'],
        teachersList: ['topolino', 'paperino'],
        pendingStudentsList: ['quo', 'qua'],
        pendingTeachersList: ['zio_paperone', 'archimede'],
      })
      .put(creators.listIsLoading())
      .run());
    it('should fail if a student isn\'t in the pending list', () => expectSaga(sagas.approveUser, {
      role: ROLES.UNCONFIRMED_STUDENT, address: 'qui',
    })
      .withReducer(reducer)
      .provide([
        [matchers.call.fn(Students.confirmStudent), throwError(new Error())],
      ])
      .hasFinalState(failedState)
      .put(creators.listIsLoading())
      .run());
  });
  describe('Confirm a teacher', () => {
    it('should confirm the selected teacher', () => expectSaga(sagas.approveUser, {
      role: ROLES.UNCONFIRMED_TEACHER,
      address: 'zio_paperone',
    })
      .withReducer(reducer, filledState)
      .provide([
        [matchers.call.fn(Teachers.confirmTeacher), true],
      ])
      .hasFinalState({
        loading: false,
        errored: false,
        studentsList: ['pluto', 'pippo'],
        teachersList: ['topolino', 'paperino', 'zio_paperone'],
        pendingStudentsList: ['qui', 'quo', 'qua'],
        pendingTeachersList: ['archimede'],
      })
      .put(creators.listIsLoading())
      .run());
    it('should fail if a teacher isn\'t in the pending list', () => expectSaga(sagas.approveUser, {
      role: ROLES.UNCONFIRMED_TEACHER,
      address: 'qui',
    })
      .withReducer(reducer)
      .provide([
        [matchers.call.fn(Teachers.confirmTeacher), throwError(new Error())],
      ])
      .hasFinalState(failedState)
      .put(creators.listIsLoading())
      .run());
  });
  /* describe('Remove a teacher', () => {
    it('should remove the selected teacher', () => expectSaga(sagas.deleteUser, {
      role: ROLES.UNCONFIRMED_TEACHER, address: 'archimede' })
      .withReducer(reducer, filledState)
      .provide([
        [matchers.call.fn(Teachers.removeTeacher), true],
      ])
      .hasFinalState({
        loading: false,
        errored: false,
        studentsList: ['pluto', 'pippo'],
        teachersList: ['topolino', 'paperino'],
        pendingStudentsList: ['qui', 'quo', 'qua'],
        pendingTeachersList: ['zio_paperone'],
      })
      .put(creators.listIsLoading())
      .run());
    it('should fail if a teacher isn\'t in the pending list', () => expectSaga(sagas.deleteUser, {
      role: ROLES.UNCONFIRMED_TEACHER, address: 'archimede',
    })
      .withReducer(reducer)
      .provide([
        [matchers.call.fn(Teachers.removeTeacher), throwError(new Error())],
      ])
      .hasFinalState(failedState)
      .put(creators.listIsLoading())
      .run());
  });
  describe('Remove a student', () => {
    it('should remove the selected student', () => expectSaga(sagas.deleteUser, {
    role: ROLES.UNCONFIRMED_STUDENT, address: 'quo' })
      .withReducer(reducer, filledState)
      .provide([
        [matchers.call.fn(Students.removeStudent), true],
      ])
      .hasFinalState({
        loading: false,
        errored: false,
        studentsList: ['pluto', 'pippo'],
        teachersList: ['topolino', 'paperino'],
        pendingStudentsList: ['qui', 'qua'],
        pendingTeachersList: ['zio_paperone', 'archimede'],
      })
      .put(creators.listIsLoading())
      .run());
    it('should fail if a student isn\'t in the pending list', () => expectSaga(sagas.deleteUser, {
      role: ROLES.UNCONFIRMED_STUDENT, address: 'quo',
    })
      .withReducer(reducer)
      .provide([
        [matchers.call.fn(Students.removeStudent), throwError(new Error())],
      ])
      .hasFinalState(failedState)
      .put(creators.listIsLoading())
      .run());
  }); */
  GentlyFail(features, reducer, failedState);
});
describe('get Lists', () => {
  it('should get the students list', () => expectSaga(sagas.getAllStudents)
    .withReducer(reducer)
    .provide({
      call() {
        return true;
      },
      all() {
        return filledState.studentsList;
      },
    })
    .hasFinalState({
      loading: false,
      errored: false,
      studentsList: ['pluto', 'pippo'],
      teachersList: [],
      pendingStudentsList: [],
      pendingTeachersList: [],
    })
    .run());
  it('should get the teachers list', () => expectSaga(sagas.getAllTeachers)
    .withReducer(reducer)
    .provide({
      call() {
        return true;
      },
      all() {
        return filledState.teachersList;
      },
    })
    .hasFinalState({
      loading: false,
      errored: false,
      studentsList: [],
      teachersList: ['topolino', 'paperino'],
      pendingStudentsList: [],
      pendingTeachersList: [],
    })
    .run());
  it('should get the pending students list', () => expectSaga(sagas.getPendingStudents)
    .withReducer(reducer)
    .provide({
      call() {
        return true;
      },
      all() {
        return filledState.pendingStudentsList;
      },
    })
    .hasFinalState({
      loading: false,
      errored: false,
      studentsList: [],
      teachersList: [],
      pendingStudentsList: ['qui', 'quo', 'qua'],
      pendingTeachersList: [],
    })
    .run());
  /* it('should get the pending teachers list', () => expectSaga(sagas.getPendingTeachers)
    .withReducer(reducer)
    .provide({
      call() {
        return true;
      },
      all() {
        return filledState.pendingTeachersList;
      },
    })
    .hasFinalState({
      loading: false,
      errored: false,
      studentsList: [],
      teachersList: [],
      pendingStudentsList: [],
      pendingTeachersList: ['zio_paperone', 'archimede'],
    })
    .run()); */
});
