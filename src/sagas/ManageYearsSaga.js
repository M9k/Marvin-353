import { call, put, fork, takeLatest, takeEvery, all } from 'redux-saga/effects';
import { creators as actionCreators } from '../ducks/ManageYears';
import * as UniversityYear from '../web3calls/UniversityYear';
import * as Year from '../web3calls/Year';

const actionType = type => `marvin/ManageYearsSaga/${type}`;
const GET = actionType('GET');
const ADD = actionType('ADD');
const REMOVE = actionType('REMOVE');

export function* addYear(solarYear) {
  yield put(actionCreators.listIsLoading());
  try{
    throw Error();
  } catch(e) {
    yield put(actionCreators.listHasErrored());
  }
}
export function* removeEmptyYear(solarYear) {
  yield put(actionCreators.listIsLoading());
  try {
    throw Error();
  } catch (e) {
    yield put(actionCreators.listHasErrored());
  }
}
export function* getAllYears()  {
  yield put(actionCreators.listIsLoading());
  try {
    let yearNumber = yield call(UniversityYear.getAcademicYearNumber);
    yearNumber = Number(yearNumber);
    const getYearsAddressCalls = Array(yearNumber).fill().map((_, i) => (
      call(UniversityYear.getAcademicYearContractAt, i)
    ));
    const contracts = yield all(getYearsAddressCalls);
    const getYearAddress = contracts.map(addr => call(Year.getSolarYear, addr));
    const solarYears = yield all(getYearAddress);
    yield put(actionCreators.setAccademicYearList(solarYears));
  } catch (e) {
    console.log('Fail to get years');
    yield put(actionCreators.listHasErrored());
  }
}

export const creators = {
  addYear: year => (
    { type: ADD, year }
  ),
  removeEmptyYear: year => (
    { type: REMOVE, year }
  ),
  getAllYears: () => (
    { type: GET }
  )
};

export default function* handler() {
  yield [
    fork(takeLatest, GET, getAllYears),
    fork(takeEvery, ADD, addYear),
    fork(takeEvery, REMOVE, removeEmptyYear),
  ];
};
