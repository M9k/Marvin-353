import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import reducer, { initialState, creators } from '../../../src/ducks/Evaluator';
import * as sagas from '../../../src/sagas/EvaluatorSaga';
import GentlyFail from './GentlyFail';

const features = [];
const failedState = {};

describe('Evaluator feature', () => {
  GentlyFail(features, reducer, failedState);
});
