import { expect } from 'chai';
import * as types from '../../src/actions/actions';
import { universityData } from '../../src/reducers/university';

const correctInitialState = {
  adminNumber: 0,
  adminAccount: null,
};
const superPureActions = [
  types.universityAction.GET_ADMIN_NUMBER,
  types.universityAction.ADD_NEW_ADMIN,
  types.universityAction.GET_ALL_ADMINS,
];
describe('university reducer', () => {
  it('should have the correct initial state ', () => {
    expect(universityData(undefined, {})).to.deep.equal(correctInitialState);
  });
  superPureActions.forEach((actionName) => {
    it(`should have the previous state with ${actionName}`, () => {
      expect(universityData(undefined, { type: actionName })).to.deep.equal(correctInitialState);
    });
  });
});
describe('university reducer with SET_ADMIN_NUMBER action', () => {
  it('should return the state with the correct admin number', () => {
    expect(universityData(undefined, {
      type: types.universityAction.SET_ADMIN_NUMBER,
      adminNumber: 5,
    })).to.deep.equal({
      adminNumber: 5,
      adminAccount: null,
    });
  });
});
describe('university reducer with SET_ADMIN_LIST action', () => {
  it('should return the state with the given list', () => {
    expect(universityData({adminNumber: 1, adminAccount: null}, {
      type: types.universityAction.SET_ADMINS_LIST,
      account: ['pippo']
    })).to.deep.equal({
      adminNumber: 1,
      adminAccount: ['pippo']
    });
  });
});

