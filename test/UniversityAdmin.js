require('./UniversityBase'); // require the UniversityBase test to pass first then
// it will execute those tests too

const UniversityAdmin = artifacts.require('./contracts/UniversityAdmin.sol');
const { assert } = require('chai');
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

  // Testing isUniversityFounder function
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

  // Testing isAdmin
  it(testTitle('Should return true if is admin!'), async () => {
    assert.equal(await contract.isAdmin.call(accounts[0]), false);
    assert.equal(await contract.isAdmin.call(accounts[1]), true);
    assert.equal(await contract.isAdmin.call(accounts[2]), false);
  });

  // Testing login function 2 - admin login
  it(testTitle('Should login with university and admin accounts!'), async () => {
    assert.equal(await contract.login.call({ from: accounts[0] }), 1);
    assert.equal(await contract.login.call({ from: accounts[1] }), 2);
    assert.equal(await contract.login.call({ from: accounts[2] }), 0);
    assert.equal(await contract.login.call({ from: accounts[3] }), 0);
  });

  // Testing getAdminsNumber function
  it(testTitle('Should return correct number of admins!'), async () => {
    assert.notEqual(await contract.getAdminsNumber.call(), 0);
    assert.equal(await contract.getAdminsNumber.call(), 1);
    assert.notEqual(await contract.getAdminsNumber.call(), 2);
  });

  // Testing getAdminAt function
  it(testTitle('Should return correct admin account!'), async () => {
    assert.notEqual(await contract.getAdminAt.call(1), accounts[0]);
    assert.equal(await contract.getAdminAt.call(0), accounts[1]);
    assert.notEqual(await contract.getAdminAt.call(2), accounts[2]);
  });

  // Testing removeAdmin modifiers
  it(testTitle('Should not remove admin account using not founder account!'), async () => {
    assert.equal(await contract.isAdmin.call(accounts[1]), true);
    try {
      await contract.isAdmin.call(accounts[1], { from: accounts2 });
    } catch (e) {
      assert.equal(await contract.isAdmin.call(accounts[1]), true);
      return true;
    }
    throw new Error('Test failed!');
  });

  // Testing removeAdmin function
  it(testTitle('Should remove admin account!'), async () => {
    assert.equal(await contract.isAdmin.call(accounts[1]), true);
    await contract.removeAdmin(accounts[1]);
    assert.equal(await contract.isAdmin.call(accounts[1]), false);
  });
});

