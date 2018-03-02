require('./UniversityAdmin'); // require the UniversityAdmin test to pass first then
// it will execute those tests too

const UniversityTeacher = artifacts.require('./contracts/UniversityTeacher.sol');
const assert = require('chai').assert;
// const expect = require('chai').expect;
// const BigNumber = require('bignumber.js');

contract('UniversityTeacher', (accounts) => {
  let contract;
  let test = 0;
  let testN = '';

  beforeEach('Deploy University contract on blockchain', async () => {
    // Il deploy del contratto viene fatto usando il primo account con indice [0]
    contract = await UniversityTeacher.deployed({ from: accounts[0] });
  });

  function testTitle(_testT) {
    test += 1;// next test
    testN = test.toString().padStart(3, '0');
    return `${testN} - ${_testT}`;
  }

  // Testing isUniversityFounder function
  it(testTitle('Should say Universtiy is registered others no!'), async () => {
    assert.equal(await contract.isUniversityFounder.call(accounts[0]), true);
    assert.equal(await contract.isUniversityFounder.call(accounts[1]), false);
    assert.equal(await contract.isUniversityFounder.call(accounts[2]), false);
    assert.equal(await contract.isUniversityFounder.call(accounts[3]), false);
  });
});

