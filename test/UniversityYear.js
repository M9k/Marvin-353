const UniversityYear = artifacts.require('./contracts/UniversityYear.sol');
const { assert } = require('chai');
// const expect = require('chai').expect;
// const BigNumber = require('bignumber.js');

contract('UniversityYear', (accounts) => {
  let contract;

  beforeEach('Deploy University contract on blockchain', async () => {
    contract = await UniversityYear.new({ from: accounts[0] });
  });

  // TODO: Placeholder! Only to see the gas cost of the complete contract
  it('Should say University is Founder', async () => {
    assert.equal(await contract.isUniversityFounder.call(accounts[0]), true);
  });
});

