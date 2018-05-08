import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import reducer, { creators } from '../../../src/ducks/Admin';
import * as sagas from '../../../src/sagas/AdminSaga';
import * as User from '../../../src/web3calls/User';
import * as Students from '../../../src/web3calls/UniversityStudent';
import { getCourseContract } from '../../../src/web3calls/Student';
import { getName } from '../../../src/web3calls/Course';
import * as Teachers from '../../../src/web3calls/UniversityTeacher';
import ROLES from '../../../src/util/logic/AccountEnum';
import * as matchers from "redux-saga-test-plan/matchers";
import * as UniversityAdmin from "../../../src/web3calls/UniversityAdmin";

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
  studentsList: [
    {
      contract: 'contratto1',
      address: 'indirizzo1',
      name: 'pippo',
      surname: 'inzaghi',
      course: 'farmacia',
    }],
  teachersList: [
    {
      contract: 'contratto2',
      address: 'indirizzo2',
      name: 'fabio',
      surname: 'cannavaro',
    }],
  pendingStudentsList: [
    {
      contract: 'contratto3',
      address: 'indirizzo3',
      name: 'gianluca',
      surname: 'zambrotta',
      course: 'informatica',
    }],
  pendingTeachersList: [
    {
      contract: 'contratto4',
      address: 'indirizzo4',
      name: 'rino',
      surname: 'gattuso',
    }],
};

describe('Admin remove', () => {
  it('should remove a student', () => expectSaga(sagas.deleteUser, sagas.creators.removeUserAction(ROLES.STUDENT, 'contratto1'))
    .withReducer(reducer, filledState)
    .provide([
      [matchers.call.fn(Students.removeStudent), true],
    ])
    .hasFinalState({
      loading: false,
      errored: false,
      studentsList: [],
      teachersList: [
        {
          contract: 'contratto2',
          address: 'indirizzo2',
          name: 'fabio',
          surname: 'cannavaro',
        }],
      pendingStudentsList: [
        {
          contract: 'contratto3',
          address: 'indirizzo3',
          name: 'gianluca',
          surname: 'zambrotta',
          course: 'informatica',
        }],
      pendingTeachersList: [
        {
          contract: 'contratto4',
          address: 'indirizzo4',
          name: 'rino',
          surname: 'gattuso',
        }],
    })
    .run());
  it('should remove a teacher', () => expectSaga(sagas.deleteUser, sagas.creators.removeUserAction(ROLES.TEACHER, 'contratto2'))
    .withReducer(reducer, filledState)
    .provide([
      [matchers.call.fn(Teachers.removeTeacher), true],
    ])
    .hasFinalState({
      loading: false,
      errored: false,
      studentsList: [
        {
          contract: 'contratto1',
          address: 'indirizzo1',
          name: 'pippo',
          surname: 'inzaghi',
          course: 'farmacia',
        }],
      teachersList: [],
      pendingStudentsList: [
        {
          contract: 'contratto3',
          address: 'indirizzo3',
          name: 'gianluca',
          surname: 'zambrotta',
          course: 'informatica',
        }],
      pendingTeachersList: [
        {
          contract: 'contratto4',
          address: 'indirizzo4',
          name: 'rino',
          surname: 'gattuso',
        }],
    })
    .run());
  it('should deny a student', () => expectSaga(sagas.denyUser, sagas.creators.denyUserAction(ROLES.UNCONFIRMED_STUDENT, 'contratto3'))
    .withReducer(reducer, filledState)
    .provide([
      [matchers.call.fn(Students.denyStudent), true],
    ])
    .hasFinalState({
      loading: false,
      errored: false,
      studentsList: [
        {
          contract: 'contratto1',
          address: 'indirizzo1',
          name: 'pippo',
          surname: 'inzaghi',
          course: 'farmacia',
        }],
      teachersList: [
        {
          contract: 'contratto2',
          address: 'indirizzo2',
          name: 'fabio',
          surname: 'cannavaro',
        }],
      pendingStudentsList: [],
      pendingTeachersList: [
        {
          contract: 'contratto4',
          address: 'indirizzo4',
          name: 'rino',
          surname: 'gattuso',
        },
      ],
    })
    .run());
  it('should deny a teacher', () => expectSaga(sagas.denyUser, sagas.creators.denyUserAction(ROLES.UNCONFIRMED_TEACHER, 'contratto4'))
    .withReducer(reducer, filledState)
    .provide([
      [matchers.call.fn(Teachers.denyTeacher), true],
    ])
    .hasFinalState({
      loading: false,
      errored: false,
      studentsList: [
        {
          contract: 'contratto1',
          address: 'indirizzo1',
          name: 'pippo',
          surname: 'inzaghi',
          course: 'farmacia',
        }],
      teachersList: [
        {
          contract: 'contratto2',
          address: 'indirizzo2',
          name: 'fabio',
          surname: 'cannavaro',
        }],
      pendingStudentsList: [
        {
          contract: 'contratto3',
          address: 'indirizzo3',
          name: 'gianluca',
          surname: 'zambrotta',
          course: 'informatica',
        }],
      pendingTeachersList: [],
    })
    .run());
});
