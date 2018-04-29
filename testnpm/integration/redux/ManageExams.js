import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import CourseReducer, { creators as CourseCreators } from '../../../src/ducks/CourseExams';
import TeacherReducer, { creators as TeacherCreators } from '../../../src/ducks/TeachersList';
import ExamsReducer, { creators as ExamsCreators } from '../../../src/ducks/ExamsList';
import * as sagas from '../../../src/sagas/ManageExamsSaga';
import GentlyFail from './GentlyFail';


describe('ManageExams feature', () => {
});
