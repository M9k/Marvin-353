import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import reducer, { initialState, creators } from '../../../src/ducks/TeacherExam';
import * as sagas from '../../../src/sagas/TeacherExamSaga';
import GentlyFail from './GentlyFail';

const features = [];
const failedState = {};

describe('TeacherExam feature', () => {
  GentlyFail(features, reducer, failedState);
});
