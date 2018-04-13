import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import reducer from '../../../src/ducks/AdminEmployer';
import * as sagas from '../../../src/sagas/AdminEmployerSaga';
import * as UniversityAdmin from '../../../src/web3calls/UniversityAdmin';

const failedState = {
  loading: false,
  errored: true,
  adminAccount: [],
};
const filledState = {
  errored: false,
  loading: false,
  adminAccount: ['topolino', 'pippo', 'paperino'],
};

describe('add new admin feature', () => {
  it('should succesfully add the admin provided', () => expectSaga(sagas.addAdmin, { address: 'pippo' })
    .withReducer(reducer)
    .provide([
      [matchers.call.fn(UniversityAdmin.addNewAdmin), true],
    ])
    .hasFinalState({
      loading: false,
      errored: false,
      adminAccount: ['pippo'],
    })
    .run());
  it('should fail gently when add an admin that already exist', () => expectSaga(sagas.addAdmin, { address: 'pippo' })
    .withReducer(reducer, filledState)
    .provide([
      [matchers.call.fn(UniversityAdmin.addNewAdmin), throwError(new Error())],
    ])
    .hasFinalState(Object.assign({}, filledState, { errored: true }))
    .run());
});
describe('remove admin feature', () => {
  it('should remove the correct admin', () => expectSaga(sagas.removeAdmin, { address: 'pippo' })
    .withReducer(reducer, filledState)
    .provide([
      [matchers.call.fn(UniversityAdmin.removeAdmin), true],
    ])
    .hasFinalState({
      loading: false,
      errored: false,
      adminAccount: ['topolino', 'paperino'],
    })
    .run());
  it('shouldnt remove an admin that not exist', () => expectSaga(sagas.removeAdmin, { address: 'pluto' })
    .withReducer(reducer, filledState)
    .provide([
      [matchers.call.fn(UniversityAdmin.removeAdmin), true],
    ])
    .hasFinalState(filledState)
    .run());
});
describe('when web3 is down', () => {
  [sagas.addAdmin, sagas.removeAdmin, sagas.getAllAdmins].forEach((feature) => {
    it('all features should fail gently', () => expectSaga(feature)
      .withReducer(reducer)
      .provide([
        [matchers.call.fn(UniversityAdmin.addNewAdmin), throwError(new Error())],
      ])
      .hasFinalState(failedState)
      .run());
  });
});
