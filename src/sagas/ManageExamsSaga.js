import { call, put, fork } from 'redux-saga/effects';
import { creators as actionCreators } from '../ducks/ManageExams';

const actionType = type => `marvin/ManageExamsSaga/${type}`;

export const creators = {};

export default function* handler() {
  yield [];
};
