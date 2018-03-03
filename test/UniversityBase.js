require('./User');

const UniversityBase = artifacts.require('./contracts/UniversityBase.sol');
const { assert } = require('chai');
// const expect = require('chai').expect;
// const BigNumber = require('bignumber.js');
// accounts[0] University
// accounts[1] NotRegistered
// accounts[2] Admin
// accounts[3] Teacher
// accounts[4] Student
// accounts[5] Admin last!

contract('UniversityBase', (accounts) => {
  let contract;
  let test = 0;
  let testN = '';

  // ATTENZIONE!
  // await non utilizzabile nel caso i parametri non rispettino i modifier
  // la chiamata in quel caso non sarà mai invocata e non ci sarà mai un ritorno
  // le EVM si devono rifiutare di eseguire qualsiasi fuzione se vietate da un modifier

  // Prima di fare qualsiasi altro test verifico che sia stato caricato il contratto
  beforeEach('Deploy University contract on blockchain', async () => {
    // Il deploy del contratto viene fatto usando il primo account con indice [0]
    contract = await UniversityBase.deployed({ from: accounts[0] });
  });

  function testTitle(_testT) {
    test += 1;// next test
    testN = test.toString().padStart(3, '0');
    return `${testN} - ${_testT}`;
  }

  /*
  function bytes32ToString(stringToConvert) {
    return web3.toAscii(stringToConvert).replace(/\u0000/g, '');
  }
  */

  it(testTitle('Should say Universtiy is Founder!'), async () => {
    assert.equal(await contract.isUniversityFounder.call(accounts[0]), true);
  });

  it(testTitle('Should say random user is not Founder!'), async () => {
    assert.equal(await contract.isUniversityFounder.call(accounts[1]), false);
  });

  it(testTitle('Should login Universtiy with value 1!'), async () => {
    assert.equal(await contract.login.call({ from: accounts[0] }), 1);
  });

  it(testTitle('Should login user not registred with value 0!'), async () => {
    assert.equal(await contract.login.call({ from: accounts[1] }), 0);
  });
});
/*
// Controlla che account 0 è università
it(testTitle('Chai assert module test: Should say it\'s university!'), async () => {
  assert.equal(await contract.isUniversityFounder.call(accounts[0]), true);
});

// Controlla che account 1 non sia università
it(testTitle('Chai assert module test: Should say it\'s not university!'), async () => {
  assert.equal(await contract.isUniversityFounder.call(accounts[1]), false);
  assert.equal(await contract.alreadyRegistered.call(accounts[1]), false);
});

// Check that university login return univ
it(testTitle('Chai assert module test: Should return university 1!'), async () => {
  assert.equal(await contract.login.call({ from: accounts[0] }), 1);
});

// Check that university login return univ
it(testTitle('Chai assert module test: Should return not registered 0!'), async () => {
  assert.equal(await contract.login.call({ from: accounts[1] }), 0);
});

it(testTitle('Chai assert module test: Adding new admin! Should add new admin!'), async () => {
  await contract.newAdmin(accounts[2]);
  assert.equal(await contract.isAdmin.call(accounts[2]), true);
  assert.equal(await contract.getAdminsNumber.call(), 1);
  assert.equal(await contract.alreadyRegistered.call(accounts[2]), true);
});

it(testTitle('Chai assert module test: Adding existing admin! Shouldn\'t add existing admin!'), async () => {
  try {
    await contract.newAdmin.call(accounts[2]);
  } catch (e) {
    return true;
  }
  throw new Error('Test 006 failed!');
});

it(testTitle('Chai assert module test: checking if admin exist or not! Should return true if admin exist false if not!'), async () => {
  const res = await contract.isAdmin.call(accounts[2]);
  const res2 = await contract.isAdmin.call(accounts[1]);
  assert.isTrue(res);
  assert.isFalse(res2);
});

it(testTitle('Chai assert module test: Adding new teacher! Should add new teacher!'), async () => {
  await contract.newTeacher(accounts[3]);
  assert.equal(await contract.isTeacher.call(accounts[3]), true);
  assert.equal(await contract.getTeachersNumber.call(), 1);
});

it(testTitle('Chai assert module test: Adding existing teacher! Shouldn\'t add existing teacher!'), async () => {
  try {
    await contract.newTeacher(accounts[3]);
  } catch (e) {
    return true;
  }
  throw new Error('Test 009 failed!');
});

it(testTitle('Chai assert module test: checking if teacher exist or not! Should return true if teacher exist false if not!'), async () => {
  const res = await contract.isTeacher.call(accounts[3]);
  const res2 = await contract.isTeacher.call(accounts[1]);
  assert.isTrue(res);
  assert.isFalse(res2);
});


it(testTitle('Chai assert module test: Adding new student! Should add new student!'), async () => {
  await contract.newStudent(accounts[4], { from: accounts[0] });
  assert.equal(await contract.isStudent.call(accounts[4]), true);
  assert.equal(await contract.getStudentsNumber.call(), 1);
});

it(testTitle('Chai assert module test: Should return Student 4!'), async () => {
  assert.equal(await contract.login.call({ from: accounts[4] }), 4);
});

it(testTitle('Chai assert module test: Adding existing student! Shouldn\'t add existing student!'), async () => {
  try {
    await contract.newStudent(accounts[4]);
  } catch (e) {
    return true;
  }
  throw new Error('Test 015 failed!');
});

it(testTitle("Adding new student without admin. Shouldn't add this student!"), async () => {
  try {
    (await contract.newStudent(accounts[5], { from: accounts[1] }));
  } catch (errore) {
    assert.equal(errore.message, 'VM Exception while processing transaction: revert');
    assert.equal(errore.name, 'Error');
  }
  // expect(await contract.newStudent(accounts[5], { from: accounts[1] })).to.throw(Error);

  assert.equal(await contract.isStudent.call(accounts[5]), false);
  assert.equal(await contract.getStudentsNumber.call(), 1);
});

it(testTitle('Chai assert module test: Checking if student exist or not! Should return true if student exist false if not!'), async () => {
  const res = await contract.isStudent.call(accounts[4]);
  const res2 = await contract.isStudent.call(accounts[1]);
  assert.isTrue(res);
  assert.isFalse(res2);
});

// TEST with BDD Chai's module:
it(testTitle('Chai BDD expect module test: It should add new student'), async () => {
  await contract.newStudent('0xBCD5F98A16d2C0A5A2bB834a211dF0617C45C1FD', { from: accounts[0] });
  expect(await contract.isStudent.call('0xBCD5F98A16d2C0A5A2bB834a211dF0617C45C1FD')).to.equal(true);
  expect(await contract.getStudentsNumber.call()).to.not.equal(1);

  // Altri test che si possono essere utilizzati per controllare le liste ecc..
  expect(null).to.be.a('null');
  expect([1, 2]).to.be.an('array').that.does.not.include(3);
});

it(testTitle("Chai assert module test: Shouldn't add a user if already in the system!"), async () => {
  assert.equal(await contract.alreadyRegistered.call(accounts[0]), true);
  try {
    await contract.newTeacher(accounts[0]);
  } catch (e) {
    return true;
  }
  throw new Error('Shouldn\'t add users if already in the system!');
});

it(testTitle('Chai assert module test: Should return last inserted admin'), async () => {
  await contract.newAdmin(accounts[5]);
  const adminMaxIndex = await contract.getAdminsNumber.call();
  assert.equal(await contract.getAdminAt.call(adminMaxIndex), accounts[5]);
});
});
*/

