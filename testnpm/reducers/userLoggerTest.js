import { expect } from 'chai';
import * as types from '../../src/actions/actions';
import { userLogger, initialState } from '../../src/reducers/user';

describe('userLogger reducer', () => {
  it('should have initial state', () => {
    expect(userLogger(undefined, {})).to.deep.equal(initialState);
  });

  it('should say metamask is true', () => {
    const action = { type: types.userAction.METAMASK };
    expect(userLogger({}, action)).to.deep.equal({
      metamask: true,
    });
  });

  it('should say user is logged', () => {
    const action = { type: types.userAction.USER_LOGGED_IN };
    expect(userLogger({}, action)).to.deep.equal({
      trylogin: false,
      logged: true,
      role: undefined,
    });
  });
});
