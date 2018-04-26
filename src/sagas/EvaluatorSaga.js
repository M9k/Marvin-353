import { call, put, fork } from 'redux-saga/effects';
import { creators as actionCreators } from '../ducks/Evaluator';

const actionType = type => `marvin/EvaluatorSaga/${type}`;

export const creators = {};

export default function* handler() {
  yield [];
};
