import { expect } from 'chai';
import * as types from '../../src/actions/actions';
import { userLogger, initialState } from '../../src/reducers/user';

describe('userLogger reducer', () => {
  it('should have initial state', () => {
    expect(userLogger(undefined, {})).to.deep.equal(initialState);
  });

  it('shouldhandle USER_LOGGED_IN', () => {
    const action = { type: types.userAction.USER_LOGGED_IN };
    expect(userLogger({}, action)).to.deep.equal({
      trylogin: false,
      logged: true,
      role: undefined,
    });
  });

  it('should handle USER_UPDATED', () => {
    const action = { type: types.userAction.USER_UPDATED };
    expect(userLogger({}, action)).to.deep.equal({
      trylogin: false,
      logged: true,
      role: undefined,
    });
  });

  it('should handle USER_LOGGED_OUT', () => {
    const action = { type: types.userAction.USER_LOGGED_OUT };
    expect(userLogger({}, action)).to.deep.equal({
      trylogin: false,
      logged: false,
      role: null,
    });
  });

  it('should handle USER_TRY_LOGIN', () => {
    const action = { type: types.userAction.USER_TRY_LOGIN };
    expect(userLogger({}, action)).to.deep.equal({
      trylogin: true,
      logged: false,
      role: null,
    });
  });

  it('should handle METAMASK', () => {
    const action = { type: types.userAction.METAMASK };
    expect(userLogger({}, action)).to.deep.equal({
      metamask: true,
    });
  });

  it('should handle EDIT_ADDRESS undefined', () => {
    const actionUndefined = { type: types.userAction.EDIT_ADDRESS, address: undefined };
    expect(userLogger({}, actionUndefined)).to.deep.equal({
      account: null,
    });
  });

  it('should handle EDIT_ADDRESS defined', () => {
    const actionDefined = { address: '0xciao', type: types.userAction.EDIT_ADDRESS };
    expect(userLogger(initialState, actionDefined)).to.deep.equal({
      metamask: false,
      account: '0xciao',
      trylogin: false,
      logged: false,
      role: null,
    });
  });
});
