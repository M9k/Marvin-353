import { call, put } from 'redux-saga/effects';
import { expect } from 'chai';
import { tryLogin } from '../../src/sagas/userSaga';
import login from '../../src/web3calls/login';
import { userAction } from '../../src/actions/actions';

describe("user saga login flow", () => {
  const loginIt = tryLogin();
  it("should call the api login function", () => {
    expect(loginIt.next().value).to.deep.equal(call(login));
  });
  it("should fire the USER_LOGGED_IN action", () => {
    expect(loginIt.next(0).value).to.deep.equal(put({
      type: userAction.USER_LOGGED_IN,
      role: 0
    }));
  });
  it("should be done after fire the action", () =>{
    expect(loginIt.next().done).to.be.true;
  });
});
