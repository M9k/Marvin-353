const University = artifacts.require('./contracts/University.sol');
const assert = require('chai').assert;
const expect = require('chai').expect;

contract('University', (accounts) => {
  let contract;

  // Prima di fare qualsiasi altro test verifico che sia stato caricato il contratto
  beforeEach('Deploy University contract on blockchain', async () => {
    // Il deploy del contratto viene fatto usando il primo account con indice [0]
    contract = await University.deployed({ from: accounts[0] });
  });

  // Aggiunge e controlla che l'utente sia stato aggiunto, fa test su tutti i valori che hanno side-effect quando viene aggiunto un nuoco studente
  it('Chai assert module test: Adding new student! Should add new student!', async () => {
    // Provo aggiungere un nuovo studente con il primo account, tutto ok poichè il creatore
    await contract.newStudent('0x6868943917cA499a14fE49dD8Ce1c34Df3fE9d19', { from: accounts[0] });
    assert.equal(await contract.isStudent('0x6868943917cA499a14fE49dD8Ce1c34Df3fE9d19'), true);
    assert.equal(await contract.getStudentsNumber(), 1);
  });
  // Provo aggiungere uno studente che esiste già, il test passa se non riesco aggiungere l'utente.
  it("Chai assert module test: Adding existing student! Shouldn't add existing student!", async () => {
    // Se non metto {from: accounts[0]} prende automaticamente il primo account con indice [0]
    await contract.newStudent('0x6868943917cA499a14fE49dD8Ce1c34Df3fE9d19');
    assert.equal(await contract.getStudentsNumber(), 1);
  });

  /* //Aggiungere un altro account(quindi tutto ok fino qui) ma con un msg.sender che non è ne admin ne il creatore del contratto ovvero [0]
  it("Adding new student without admin or contract creator account(first testrpc account)! Shouldn't add this student!", async function() {

    //Provo aggiungere un nuovo studente con il secondo account, ovvero account che non è ne admin ne creatore del contratto
    await contract.newStudent("0x1579543917cA499a14fE49dD8Ce1c34Df3fE0000", {from: accounts[1]});
    assert.equal(await contract.isStudent("0x1579543917cA499a14fE49dD8Ce1c34Df3fE0000"), false );
    assert.equal(await  contract.getStudentsNumber(), 1);
  }); */


  // Provo aggiungere uno studente con address null
  it("Chai assert module test: Shouldn't add student with address null!", async () => {
    await contract.newStudent('');
    assert.equal(await contract.getStudentsNumber(), 1);
  });

  it('Chai assert module test: Checking if student exist or not! Should return true if student exist false if not!', async () => {
    const res = await contract.isStudent('0x6868943917cA499a14fE49dD8Ce1c34Df3fE9d19');
    const res2 = await contract.isStudent('0x452343917cA499a14fE49dD8Ce1c34Df3fE9454');
    assert.isTrue(res);
    assert.isFalse(res2);
  });

  // Aggiunge e controlla che il docente sia stato aggiunto, fa test su tutti i valori che hanno side-effect quando viene aggiunto un nuoco docente
  it('Chai assert module test: Adding new teacher! Should add new teacher!', async () => {
    await contract.newTeacher('0x28943917cA499a14fE49dD8Ce1c34Df3fE9d19');
    assert.equal(await contract.isTeacher('0x28943917cA499a14fE49dD8Ce1c34Df3fE9d19'), true);
    assert.equal(await contract.getTeachersNumber(), 1);
  });

  // Provo aggiungere un nuovo docente che esiste già, il test passa se non riesco aggiungere l'utente.
  it("Chai assert module test: Adding existing teacher! Shouldn't add existing teacher!", async () => {
    await contract.newTeacher('0x28943917cA499a14fE49dD8Ce1c34Df3fE9d19');
    assert.equal(await contract.getTeachersNumber(), 1);
  });

  // Provo aggiungere un docente con address null
  it("Chai assert module test: Shouldn't add new teacher with address null!", async () => {
    await contract.newTeacher('');
    assert.equal(await contract.getTeachersNumber(), 1);
  });

  it('Chai assert module test: hecking if teacher exist or not! Should return true if teacher exist false if not!', async () => {
    const res = await contract.isTeacher('0x28943917cA499a14fE49dD8Ce1c34Df3fE9d19');
    const res2 = await contract.isTeacher('0x452343917cA499a14fE49dD8Ce1c34Df3fE9454');
    assert.isTrue(res);
    assert.isFalse(res2);
  });

  // TEST with BDD Chai's module:
  it('Chai BDD expect module test: It should add new student', async () => {
    await contract.newStudent('0xBCD5F98A16d2C0A5A2bB834a211dF0617C45C1FD', { from: accounts[0] });
    expect(await contract.isStudent('0xBCD5F98A16d2C0A5A2bB834a211dF0617C45C1FD')).to.equal(true);
    expect(await contract.getStudentsNumber()).to.not.equal(1);

    // Altri test che si possono essere utilizzati per controllare le liste ecc..
    expect(null).to.be.a('null');
    expect([1, 2]).to.be.an('array').that.does.not.include(3);
  });
});
