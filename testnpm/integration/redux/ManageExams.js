import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import CourseReducer, { creators as CourseCreators } from '../../../src/ducks/CourseExams';
import TeacherReducer, { creators as TeacherCreators } from '../../../src/ducks/TeachersList';
import ExamsReducer, { creators as ExamsCreators } from '../../../src/ducks/ExamsList';
import * as sagas from '../../../src/sagas/ManageExamsSaga';
import GentlyFail from './GentlyFail';

const courseDetail = {
  courseAddress: '001',
  courseName: 'Scienze Informatiche',
  solarYear: 2017,
}
const courseExams = [
  {
    address: 'E01',
    name: 'Analisi Matematica',
    credits: 12,
    mandatory: true,
    professorName: 'Caterina',
    professorSurname: 'Sartori',
    professorAddress: '001',
  },
  {
    address: 'E02',
    name: 'Calcolo Numerico',
    credits: 7,
    mandatory: true,
    professorName: 'Michela',
    professorSurname: 'Zaglia',
    professorAddress: '002',
  },
];
const allExams = [
  Object.assign({}, courseExams[0], courseDetail),
  Object.assign({}, courseExams[1], courseDetail),
  {
    courseName: 'Filosofia',
    courseAddress: '002',
    solarYear: '2017',
    address: 'E03',
    name: 'Filosofia di qualcosa',
    credits: 6,
    mandatory: false,
    professorName: 'Un bravo',
    professorSurname: 'Filosofo',
    professorAddress: '003',
  },
];

describe('ManageExams feature', () => {
  it('should retrieve the list of all exams given a solar year', () => {

  });
  it('should retrieve the list of all exams in a course given the address', () => {

  });
  it('should retrieve the list of all the active teachers', () => {

  });
  it('should create a new exams and push it in the course list', () => {

  });
  it('should assign a teacher to an exam in the course exams list', () => {

  });
  it('should assing a teacher to an exam in the all exams list', () => {

  });
});
