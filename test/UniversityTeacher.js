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
    await contract.newAdmin(accounts[5]);
    assert.equal(await contract.isAdmin.call(accounts[5]), true);
  });

  it(testTitle('Should say Universtiy has no teachers and no Unconfirmed!'), async () => {
    assert.equal(await contract.getTeachersNumber.call({ from: accounts[1] }), 0);
    assert.equal(await contract.getUnconfirmedTeachersNumber.call({ from: accounts[0] }), 0);
  });

  it(testTitle('Should say add unconfirmed Teacher and then confirm it!'), async () => {
    // TWO STEP ACCOUNT CREATION!
    await contract.askForTeacherAccount('nomeprof', 'cognomeprof', { from: accounts[1] });
    assert.equal(await contract.isUnconfirmedTeacher.call(accounts[1]), true);
    assert.equal(await contract.isTeacher.call(accounts[1]), false);
    assert.equal(await contract.getTeachersNumber.call({ from: accounts[0] }), 0);
    assert.equal(await contract.getUnconfirmedTeachersNumber.call({ from: accounts[0] }), 1);

    // now confirm it
    await contract.confirmTeacher(accounts[1], { from: accounts[5] });
    assert.equal(await contract.isUnconfirmedTeacher.call(accounts[1]), false);
    assert.equal(await contract.isTeacher.call(accounts[1]), true);
    assert.equal(await contract.getTeachersNumber.call({ from: accounts[0] }), 1);
    assert.equal(await contract.getUnconfirmedTeachersNumber.call({ from: accounts[0] }), 0);
  });

  it(testTitle('Should add unconfirmed Teacher and then remove it!'), async () => {
    // TWO STEP ACCOUNT CREATION!
    await contract.askForTeacherAccount('nomeprof', 'cognomeprof', { from: accounts[2] });
    assert.equal(await contract.isUnconfirmedTeacher.call(accounts[2]), true);
    assert.equal(await contract.isTeacher.call(accounts[2]), false);
    assert.equal(await contract.getTeachersNumber.call({ from: accounts[0] }), 1);
    assert.equal(await contract.getUnconfirmedTeachersNumber.call({ from: accounts[0] }), 1);

    // now dont confirm  this teacher
    await contract.dontConfirmTeacher(accounts[2], { from: accounts[5] });
    assert.equal(await contract.isUnconfirmedTeacher.call(accounts[2]), false);
    assert.equal(await contract.isTeacher.call(accounts[2]), false);
    assert.equal(await contract.getTeachersNumber.call({ from: accounts[0] }), 1);
    assert.equal(await contract.getUnconfirmedTeachersNumber.call({ from: accounts[0] }), 0);
  });

  it(testTitle('Should add unconfirmed teacher!'), async () => {
    await contract.askForTeacherAccount('nomeprof', 'congomoeprof', { from: accounts[4] });
    assert.equal(await contract.isUnconfirmedTeacher.call(accounts[4]), true);
    assert.equal(await contract.isTeacher.call(accounts[4]), false);
    assert.equal(await contract.getTeachersNumber.call({ from: accounts[0] }), 1);
    assert.equal(await contract.getUnconfirmedTeachersNumber.call({ from: accounts[0] }), 1);
  });

  it(testTitle('Should return correct account with given index!'), async () => {
    assert.equal(await contract.getTeacherAtIndex.call(0), accounts[1]);
    assert.equal(await contract.getUnconfirmedTeacherAtIndex.call(0), accounts[4]);
  });

  it(testTitle('Should return teacher contract address!'), async () => {
    assert.notEqual(await contract.getTeacherContractAddress.call(accounts[1]), 0);
  });

  // Testing login function
  it(testTitle('Should login with university, teacher and unconfirmed accounts!'), async () => {
    assert.equal(await contract.login.call({ from: accounts[0] }), 1);
    assert.equal(await contract.login.call({ from: accounts[1] }), 3);
    assert.equal(await contract.login.call({ from: accounts[2] }), 0);
    assert.equal(await contract.login.call({ from: accounts[4] }), 103);
    assert.equal(await contract.login.call({ from: accounts[5] }), 2);
  });

  it(testTitle('Should remove teacher!'), async () => {
    assert.equal(await contract.isTeacher.call(accounts[1]), true);
    await contract.removeTeacher(accounts[1], { from: accounts[0] });
    assert.equal(await contract.isTeacher.call(accounts[1]), false);
  });

  it(testTitle('Should not remove teacher with invalid address!'), async () => {
    try {
      await contract.removeTeacher(accounts[1], { from: accounts[0] });
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });

  it(testTitle('Should not confirm teacher with invalid address!'), async () => {
    try {
      await contract.confirmTeacher(accounts[3], { from: accounts[0] });
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });
});

