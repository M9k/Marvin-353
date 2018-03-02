import * as types from '../../src/actions/actions.js';
import { userLogger } from '../../src/reducers/user';
import { initialState } from '../../src/reducers/user.js';

//const assert = require('chai').assert;
const expect = require('chai').expect;

describe('userLogger reducer', () => {
  it('should have initial state', () => {
    expect(userLogger(undefined, {})).to.deep.equal(initialState);
  });
});
