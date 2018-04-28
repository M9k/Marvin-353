import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
// import { throwError } from 'redux-saga-test-plan/providers';
import reducer, { creators } from '../../../src/ducks/Admin';
import * as sagas from '../../../src/sagas/AdminSaga';
import GentlyFail from './GentlyFail';
import * as Students from '../../../src/web3calls/UniversityStudent';
// import * as Teachers from '../../../src/web3calls/UniversityTeacher';
import ROLES from '../../../src/util/logic/AccountEnum';


const features = [sagas.approveUser, sagas.deleteUser, sagas.getAllTeachers, sagas.getAllStudents,
  sagas.getPendingStudents, sagas.getPendingTeachers];

const failedState = {
  loading: false,
  errored: false,
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

describe('Admin feature', () => {
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
  });
  GentlyFail(features, reducer, failedState);
});
