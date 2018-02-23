const University = artifacts.require('./contracts/University.sol');
const assert = require('chai').assert;
const expect = require('chai').expect;
const BigNumber = require('bignumber.js');
// accounts[0] University
// accounts[1] NotRegistered
// accounts[2] Admin
// accounts[3] Teacher
// accounts[4] Student

contract('University', (accounts) => {
  let contract;

  // Prima di fare qualsiasi altro test verifico che sia stato caricato il contratto
  beforeEach('Deploy University contract on blockchain', async () => {
    // Il deploy del contratto viene fatto usando il primo account con indice [0]
    contract = await University.deployed({ from: accounts[0] });
  });

  it('000 - Chai assert module test: Should say Universtiy is registered others no!', async () => {
    assert.equal(await contract.alreadyRegistered(accounts[0]), true);
    assert.equal(await contract.alreadyRegistered(accounts[1]), false);
    assert.equal(await contract.alreadyRegistered(accounts[2]), false);
    assert.equal(await contract.alreadyRegistered(accounts[3]), false);
    assert.equal(await contract.alreadyRegistered(accounts[4]), false);
  }); 
  // Controlla che account 0 è università
  it('001 - Chai assert module test: Should say it\'s university!', async () => {
    assert.equal(await contract.isUniversityFounder(accounts[0]), true);
  });

  // Controlla che account 1 non sia università
  it('002 - Chai assert module test: Should say it\'s not university!', async () => {
    assert.equal(await contract.isUniversityFounder(accounts[1]), false);
    assert.equal(await contract.alreadyRegistered(accounts[1]), false);
  });

  // Check that university login return univ
  it('003 - Chai assert module test: Should return university 1!', async () => {
    assert.equal(await contract.login({ from: accounts[0] }), 1);
  });

  // Check that university login return univ
  it('004 - Chai assert module test: Should return not registered 0!', async () => {
    assert.equal(await contract.login({ from: accounts[1] }), 0);
  });

  it('005 - assert module test: Adding new admin! Should add new admin!', async () => {
    await contract.newAdmin(accounts[2]);
    assert.equal(await contract.isAdmin(accounts[2]), true);
    assert.equal(await contract.getAdminsNumber(), 1);
    assert.equal(await contract.alreadyRegistered(accounts[2]), true);
  });

  it("006 - Chai assert module test: Adding existing admin! Shouldn't add existing admin!", async () => {
    await contract.newAdmin(accounts[2]);
    assert.equal(await contract.getAdminsNumber(), 1);
  });

  it("007 - Chai assert module test: Shouldn't add new admin with address null!", async () => {
    await contract.newAdmin('');
    assert.equal(await contract.getAdminsNumber(), 1);
  });

  it('008 - Chai assert module test: checking if admin exist or not! Should return true if admin exist false if not!', async () => {
    const res = await contract.isAdmin(accounts[2]);
    const res2 = await contract.isAdmin(accounts[1]);
    assert.isTrue(res);
    assert.isFalse(res2);
  });

  // Aggiunge e controlla che il docente sia stato aggiunto, fa test su tutti i
  // valori che hanno side-effect quando viene aggiunto un nuoco docente
  it('009 - Chai assert module test: Adding new teacher! Should add new teacher!', async () => {
    await contract.newTeacher(accounts[3]);
    assert.equal(await contract.isTeacher(accounts[3]), true);
    assert.equal(await contract.getTeachersNumber(), 1);
  });

  // Provo aggiungere un nuovo docente che esiste già, il test passa se non riesco
  // aggiungere l'utente.
  it("010 - Chai assert module test: Adding existing teacher! Shouldn't add existing teacher!", async () => {
    await contract.newTeacher(accounts[3]);
    assert.equal(await contract.getTeachersNumber(), 1);
  });

  // Provo aggiungere un docente con address null
  it("011 - Chai assert module test: Shouldn't add new teacher with address null!", async () => {
    await contract.newTeacher('');
    assert.equal(await contract.getTeachersNumber(), 1);
  });

  it('012 - Chai assert module test: checking if teacher exist or not! Should return true if teacher exist false if not!', async () => {
    const res = await contract.isTeacher(accounts[3]);
    const res2 = await contract.isTeacher(accounts[1]);
    assert.isTrue(res);
    assert.isFalse(res2);
  });


  it('013 - Chai assert module test: Adding new student! Should add new student!', async () => {
    await contract.newStudent(accounts[4], { from: accounts[0] });
    assert.equal(await contract.isStudent(accounts[4]), true);
    assert.equal(await contract.getStudentsNumber(), 1);
  });

  it('014 - Chai assert module test: Should return Student 4!', async () => {
    assert.equal(await contract.login({ from: accounts[4] }), 4);
  });

  it("015 - Chai assert module test: Adding existing student! Shouldn't add existing student!", async () => {
    await contract.newStudent(accounts[4]);
    assert.equal(await contract.getStudentsNumber(), 1);
  });

  it("016 - Adding new student without admin shouldn't add this student!", async () => {
    try {
      (await contract.newStudent(accounts[5], { from: accounts[1] }));
    } catch (errore) {
      assert.equal(errore.message, 'VM Exception while processing transaction: revert');
      assert.equal(errore.name, 'Error');
    }
    // expect(await contract.newStudent(accounts[5], { from: accounts[1] })).to.throw(Error);

    assert.equal(await contract.isStudent(accounts[5]), false);
    assert.equal(await contract.getStudentsNumber(), 1);
  });

  it("017 - Chai assert module test: Shouldn't add student with address null!", async () => {
    await contract.newStudent('');
    assert.equal(await contract.getStudentsNumber(), 1);
  });

  it('018 - Chai assert module test: Checking if student exist or not! Should return true if student exist false if not!', async () => {
    const res = await contract.isStudent(accounts[4]);
    const res2 = await contract.isStudent(accounts[1]);
    assert.isTrue(res);
    assert.isFalse(res2);
  });

  // TEST with BDD Chai's module:
  it('019 - Chai BDD expect module test: It should add new student', async () => {
    await contract.newStudent('0xBCD5F98A16d2C0A5A2bB834a211dF0617C45C1FD', { from: accounts[0] });
    expect(await contract.isStudent('0xBCD5F98A16d2C0A5A2bB834a211dF0617C45C1FD')).to.equal(true);
    expect(await contract.getStudentsNumber()).to.not.equal(1);

    // Altri test che si possono essere utilizzati per controllare le liste ecc..
    expect(null).to.be.a('null');
    expect([1, 2]).to.be.an('array').that.does.not.include(3);
  });

  it("020 - Chai assert module test: Shouldn't add a user if already in the system!", async () => {
    assert.equal(await contract.alreadyRegistered(accounts[0]), true);
    const numTeacherBefore = new BigNumber(await contract.getTeachersNumber());
    await contract.newTeacher(accounts[0]);
    const numTeacherAfter = new BigNumber(await contract.getTeachersNumber());
    expect(numTeacherBefore.isEqualTo(numTeacherAfter)).to.be.true;
  });

});
