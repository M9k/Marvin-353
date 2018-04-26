import { fork } from 'redux-saga/effects';
import Admin from './sagas/AdminSaga';
import AdminEmployer from './sagas/AdminEmployerSaga';
import Session from './sagas/SessionSaga';
import ManageYears from './sagas/ManageYearsSaga';

import Booking from './sagas/BookingSaga';

import Evaluator from './sagas/EvaluatorSaga';


export default function* sagas() {
  yield [
    fork(Admin),
    fork(AdminEmployer),
    fork(Session),
    fork(ManageYears),
    fork(Booking),
    fork(Evaluator),
  ];
}
