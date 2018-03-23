const UniversityTeacher = artifacts.require('./contracts/UniversityTeacher.sol');
const { assert } = require('chai');
// const expect = require('chai').expect;
// const BigNumber = require('bignumber.js');

contract('UniversityTeacher', (accounts) => {
  let contract;

  beforeEach('Deploy University contract on blockchain', async () => {
    contract = await UniversityTeacher.new({ from: accounts[0] });
  });

  it('Should say University found isn\'t a teacher', async () => {
    assert.equal(await contract.isTeacher.call(accounts[0]), false);
    await contract.newAdmin(accounts[5]);
    assert.equal(await contract.isAdmin.call(accounts[5]), true);
  });

  it('Should say University has no teachers and no unconfirmed teacher', async () => {
    assert.equal(await contract.getTeacherNumber.call(), 0);
    assert.equal(await contract.getNonApprovedTeacherNumber.call(), 0);
  });

  it('Everyone not registered can ask for an account', async () => {
    await contract.requestTeacherAccount('name', 'surname', { from: accounts[1] });
    assert.equal(await contract.getNonApprovedTeacherNumber.call(), 1);
    const askingAccount = await contract.getNotApprovedTeacherContractAddressAt.call(0);
    assert.equal(String(askingAccount).length, 42);
    assert.equal(await contract.getTeacherNumber.call(), 0);
  });

  it('A registered user cannot ask a teacher account', async () => {
    try {
      await contract.requestTeacherAccount('name', 'surname', { from: accounts[0] });
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });

  it('An user cannot ask two times an account', async () => {
    await contract.requestTeacherAccount('name', 'surname', { from: accounts[1] });
    try {
      await contract.requestTeacherAccount('name', 'surname', { from: accounts[1] });
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });

  it('An admin can confirm the account', async () => {
    await contract.newAdmin(accounts[1], { from: accounts[0] });
    await contract.requestTeacherAccount('name', 'surname', { from: accounts[2] });
    await contract.confirmTeacher(
      await contract.getNotApprovedTeacherContractAddressAt.call(0),
      { from: accounts[1] },
    );
    assert.equal(await contract.getTeacherNumber.call(), 1);
  });

  it('Only the admin can confirm the account', async () => {
    await contract.newAdmin(accounts[1], { from: accounts[0] });
    await contract.requestTeacherAccount('name', 'surname', { from: accounts[2] });
    try {
      await contract.confirmTeacher(
        await contract.getNotApprovedTeacherContractAddressAt.call(0),
        { from: accounts[0] },
      );
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });

  /*

        it('Should add unconfirmed Teacher and then remove it!', async () => {
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

        it('Should add unconfirmed teacher!', async () => {
          await contract.askForTeacherAccount('nomeprof', 'congomoeprof', { from: accounts[4] });
          assert.equal(await contract.isUnconfirmedTeacher.call(accounts[4]), true);
          assert.equal(await contract.isTeacher.call(accounts[4]), false);
          assert.equal(await contract.getTeachersNumber.call({ from: accounts[0] }), 1);
          assert.equal(await contract.getUnconfirmedTeachersNumber.call({ from: accounts[0] }), 1);
        });

        it('Should return correct account with given index!', async () => {
          assert.equal(await contract.getTeacherAtIndex.call(0), accounts[1]);
          assert.equal(await contract.getUnconfirmedTeacherAtIndex.call(0), accounts[4]);
        });

        it('Should return teacher contract address!', async () => {
          assert.notEqual(await contract.getTeacherContractAddress.call(accounts[1]), 0);
        });

        // Testing login function
        it('Should login with university, teacher and unconfirmed accounts!', async () => {
          assert.equal(await contract.login.call({ from: accounts[0] }), 1);
          assert.equal(await contract.login.call({ from: accounts[1] }), 3);
          assert.equal(await contract.login.call({ from: accounts[2] }), 0);
          assert.equal(await contract.login.call({ from: accounts[4] }), 103);
          assert.equal(await contract.login.call({ from: accounts[5] }), 2);
        });

        it('Should remove teacher!', async () => {
          assert.equal(await contract.isTeacher.call(accounts[1]), true);
          await contract.removeTeacher(accounts[1], { from: accounts[0] });
          assert.equal(await contract.isTeacher.call(accounts[1]), false);
        });
        */
  it('Should not remove teacher with invalid address', async () => {
    try {
      await contract.removeTeacher(accounts[1], { from: accounts[0] });
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });

  it('Should not confirm teacher with invalid address', async () => {
    try {
      await contract.confirmTeacher(accounts[3], { from: accounts[0] });
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });
});

