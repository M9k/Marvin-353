import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { creators as actionCreators } from '../ducks/TeacherExam';

const actionType = type => `marvin/TeacherExamSaga/${type}`;
const GET_LIST = actionType('GET_LIST');

export function* getExamData(userAddress, examIndex){

}

export function* getList({ userAddress }){

}
export const creators = {
  getListAction: userAddress => (
    { type: GET_LIST, userAddress }
  ),
};

export default function* handler() {
  yield [
    fork(takeLatest, GET_LIST, getList),
  ];
}
