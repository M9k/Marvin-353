require('./UniversityBase'); // require the UniversityBase test to pass first then
// it will execute those tests too

const UniversityAdmin = artifacts.require('./contracts/UniversityAdmin.sol');
const assert = require('chai').assert;
// const expect = require('chai').expect;
// const BigNumber = require('bignumber.js');

contract('UniversityAdmin', (accounts) => {
  let contract;
  let test = 0;
  let testN = '';

  beforeEach('Deploy University contract on blockchain', async () => {
    // Il deploy del contratto viene fatto usando il primo account con indice [0]
    contract = await UniversityAdmin.deployed({ from: accounts[0] });
  });

  function testTitle(_testT) {
    test += 1;// next test
    testN = test.toString().padStart(3, '0');
    return `${testN} - ${_testT}`;
  }

  // Testing isUNiversityFounder function
  it(testTitle('Should say Universtiy is registered others no!'), async () => {
    assert.equal(await contract.isUniversityFounder.call(accounts[0]), true);
    assert.equal(await contract.isUniversityFounder.call(accounts[1]), false);
    assert.equal(await contract.isUniversityFounder.call(accounts[2]), false);
    assert.equal(await contract.isUniversityFounder.call(accounts[3]), false);
  });

  // Testing login function
  it(testTitle('Should login with university only!'), async () => {
    assert.equal(await contract.login.call({ from: accounts[0] }), 1);
    assert.equal(await contract.login.call({ from: accounts[1] }), 0);
    assert.equal(await contract.login.call({ from: accounts[2] }), 0);
  });

  // Testing newAdmin function
  it(testTitle('Should add new admin!'), async () => {
    await contract.newAdmin(accounts[1]);
    assert.equal(await contract.isAdmin.call(accounts[1]), true);
  });

  // Testing newAdmin function 2 - modifier registrableAddress
  it(testTitle('Should not add existing admin'), async () => {
    try {
      await contract.newAdmin(accounts[1]);
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });
});
