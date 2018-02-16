let University = artifacts.require('./contracts/University.sol');

contract('University', function(accounts) {
  let contract;

  //Prima di fare qualsiasi altro test verifico che sia stato caricato il contratto
  beforeEach('Deploy University contract on blockchain', async function () {
    //Il deploy del contratto viene fatto usando il primo account con indice [0]
    contract = await University.deployed({from: accounts[0]});
  });

  //Aggiunge e controlla che l'utente sia stato aggiunto, fa test su tutti i valori che hanno side-effect quando viene aggiunto un nuoco studente
  it("Adding new student! Should add new student!", async function() {

    //Provo aggiungere un nuovo studente con il primo account, tutto ok poichè il creatore
    await contract.newStudent("0x6868943917cA499a14fE49dD8Ce1c34Df3fE9d19", {from: accounts[0]});
    assert.equal(await contract.isStudent("0x6868943917cA499a14fE49dD8Ce1c34Df3fE9d19"), true );
    assert.equal(await  contract.getStudentsNumber.call(), 1);
  });
  //Provo aggiungere uno studente che esiste già, il test passa se non riesco aggiungere l'utente.
  it("Adding existing student! Shouldn't add existing student!", async function() {

    //Se non metto {from: accounts[0]} prende automaticamente il primo account con indice [0]
    await  contract.newStudent("0x6868943917cA499a14fE49dD8Ce1c34Df3fE9d19");
    assert.equal(await contract.getStudentsNumber(), 1);
  });

 /* //Aggiungere un altro account(quindi tutto ok fino qui) ma con un msg.sender che non è ne admin ne il creatore del contratto ovvero [0]
  it("Adding new student without admin or contract creator account(first testrpc account)! Shouldn't add this student!", async function() {

    //Provo aggiungere un nuovo studente con il secondo account, ovvero account che non è ne admin ne creatore del contratto
    await contract.newStudent("0x1579543917cA499a14fE49dD8Ce1c34Df3fE0000", {from: accounts[1]});
    assert.equal(await contract.isStudent("0x1579543917cA499a14fE49dD8Ce1c34Df3fE0000"), false );
    assert.equal(await  contract.getStudentsNumber(), 1);
  });*/


  //Provo aggiungere uno studente con address null
  it("Shouldn't add student with address null!", async function(){
    await  contract.newStudent("");
    assert.equal(await  contract.getStudentsNumber(), 1);
  });

  it("Checking if student exist or not! Should return true if student exist false if not!", async function(){
    let res= await contract.isStudent("0x6868943917cA499a14fE49dD8Ce1c34Df3fE9d19");
    let res2= await contract.isStudent("0x452343917cA499a14fE49dD8Ce1c34Df3fE9454");
    assert.isTrue(res);
    assert.isFalse(res2);
  });

  //Aggiunge e controlla che il docente sia stato aggiunto, fa test su tutti i valori che hanno side-effect quando viene aggiunto un nuoco docente
  it("Adding new teacher! Should add new teacher!", async function() {
    await contract.newTeacher("0x28943917cA499a14fE49dD8Ce1c34Df3fE9d19");
    assert.equal(await contract.isTeacher("0x28943917cA499a14fE49dD8Ce1c34Df3fE9d19"), true );
    assert.equal(await  contract.getTeachersNumber(), 1);
  });

  //Provo aggiungere un nuovo docente che esiste già, il test passa se non riesco aggiungere l'utente.
  it("Adding existing teacher! Shouldn't add existing teacher!", async function() {
    await  contract.newTeacher("0x28943917cA499a14fE49dD8Ce1c34Df3fE9d19");
    assert.equal(await contract.getTeachersNumber(), 1);
  });

  //Provo aggiungere un docente con address null
  it("Shouldn't add new teacher with address null!", async function(){
    await  contract.newTeacher("");
    assert.equal(await  contract.getTeachersNumber(), 1);
  });

  it("Checking if teacher exist or not! Should return true if teacher exist false if not!", async function(){
    let res= await contract.isTeacher("0x28943917cA499a14fE49dD8Ce1c34Df3fE9d19");
    let res2= await contract.isTeacher("0x452343917cA499a14fE49dD8Ce1c34Df3fE9454");
    assert.isTrue(res);
    assert.isFalse(res2);
  });



});
