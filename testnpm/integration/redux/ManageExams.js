import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import reducer, { initialState, creators } from '../../../src/ducks/ManageExams';
import * as sagas from '../../../src/sagas/ManageExamsSaga';
import GentlyFail from './GentlyFail';

const features = [];
const failedState = {};

describe('ManageExams feature', () => {
  GentlyFail(features, reducer, failedState);
});
