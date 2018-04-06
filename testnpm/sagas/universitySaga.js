import { put, call } from 'redux-saga/effects';
import { expect } from 'chai';
import { getAllAdmins } from '../../src/sagas/adminEmployerSaga';
import numAdmin from '../../src/web3calls/numAdmin';
import * as universityAction from '../../src/ducks/AdminEmployer';

describe('university saga getAllAdmins', () => {
  it('should use the correct flow', () => {
    const it = getAllAdmins();
    expect(it.next().value).to.deep.equal(put(universityAction.listIsLoading()));
    expect(it.next().value).to.deep.equal(call(numAdmin));
    it.next(3);
    expect(it.next([1, 2, 3]).value).to.deep.equal(put(universityAction.setAdminsList([1, 2, 3])));
  });
  it('should handle errors', () => {
    const it = getAllAdmins();
    it.next();
    it.next();
    expect(it.next(() => (null)).value).to.deep.equal(put(universityAction.listHasErrored()));
  });
});
