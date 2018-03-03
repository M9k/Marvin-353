require('./UniversityAdmin');

const UniversityTeacher = artifacts.require('./contracts/UniversityTeacher.sol');
const { assert } = require('chai');
// const expect = require('chai').expect;
// const BigNumber = require('bignumber.js');

contract('UniversityTeacher', (accounts) => {
  let contract;
  let test = 0;
  let testN = '';

  beforeEach('Deploy University contract on blockchain', async () => {
    contract = await UniversityTeacher.deployed({ from: accounts[0] });
  });

  function testTitle(_testT) {
    test += 1;
    testN = test.toString().padStart(3, '0');
    return `${testN} - ${_testT}`;
  }


  it(testTitle('Should say Universtiy found isn\'t a teacher!'), async () => {
    assert.equal(await contract.isTeacher.call(accounts[0]), false);
  });

  it(testTitle('Should say Universtiy has no teachers and no Unconfirmed!'), async () => {
    assert.equal(await contract.getTeachersNumber.call({ from: accounts[0] }), 0);
    assert.equal(await contract.getUnconfirmedTeachersNumber.call({ from: accounts[0] }), 0);
  });

  it(testTitle('Should say add unconfirmed Teacher and then confirm it!'), async () => {
    // TWO STEP ACCOUNT CREATION!
    await contract.askForTeacherAccount('nomeprof', 'congomoeprof', { from: accounts[1] });
    assert.equal(await contract.isUnconfirmedTeacher.call(accounts[1]), true);
    assert.equal(await contract.isTeacher.call(accounts[1]), false);
    assert.equal(await contract.getTeachersNumber.call({ from: accounts[0] }), 0);
    assert.equal(await contract.getUnconfirmedTeachersNumber.call({ from: accounts[0] }), 1);

    // now confirm it
    await contract.confirmTeacher(accounts[1], { from: accounts[0] });
    assert.equal(await contract.isUnconfirmedTeacher.call(accounts[1]), false);
    assert.equal(await contract.isTeacher.call(accounts[1]), true);
    assert.equal(await contract.getTeachersNumber.call({ from: accounts[0] }), 1);
    assert.equal(await contract.getUnconfirmedTeachersNumber.call({ from: accounts[0] }), 0);
  });

  it(testTitle('Should add unconfirmed Teacher and then remove it!'), async () => {
    // TWO STEP ACCOUNT CREATION!
    await contract.askForTeacherAccount('nomeprof', 'congomoeprof', { from: accounts[2] });
    assert.equal(await contract.isUnconfirmedTeacher.call(accounts[2]), true);
    assert.equal(await contract.isTeacher.call(accounts[2]), false);
    assert.equal(await contract.getTeachersNumber.call({ from: accounts[0] }), 1);
    assert.equal(await contract.getUnconfirmedTeachersNumber.call({ from: accounts[0] }), 1);

    // now dont confirm  this teacher
    await contract.dontConfirmTeacher(accounts[2], { from: accounts[0] });
    assert.equal(await contract.isUnconfirmedTeacher.call(accounts[2]), false);
    assert.equal(await contract.isTeacher.call(accounts[2]), false);
    assert.equal(await contract.getTeachersNumber.call({ from: accounts[0] }), 1);
    assert.equal(await contract.getUnconfirmedTeachersNumber.call({ from: accounts[0] }), 0);
  });
});

