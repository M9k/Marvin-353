import { expect } from 'chai';
import * as types from '../../src/actions/actions';
import  { universityData } from '../../src/reducers/university';
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
  superPureActions.forEach((action_name) => {
    it(`should have the previous state with ${action_name}`, () => {
      expect(universityData(undefined, {type: action_name})).to.deep.equal(correctInitialState);
    });
  });
  it('should return return the state with the correct admin number', () => {
    expect(
      universityData(undefined, {type: types.universityAction.SET_ADMIN_NUMBER, adminNumber: 5})
    ).to.deep.equal({
      adminNumber: 5,
      adminAccount: null
    });
  });
});

