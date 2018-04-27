import { call, put, fork } from 'redux-saga/effects';
import { creators as actionCreators } from '../ducks/TeacherExam';

const actionType = type => `marvin/TeacherExamSaga/${type}`;

export const creators = {};

export default function* handler() {
  yield [];
};
