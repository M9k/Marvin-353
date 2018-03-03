const User = artifacts.require('./contracts/User.sol');
const { assert } = require('chai');

contract('User', (accounts) => {
  let contract;
  let test = 0;
  let testN = '';

  beforeEach('Deploy User contract on blockchain', async () => {
    contract = await User.deployed({ from: accounts[0] });
  });

  function testTitle(_testT) {
    test += 1;// next test
    testN = test.toString().padStart(3, '0');
    return `${testN} - ${_testT}`;
  }

  function bytes32ToString(stringToConvert) {
    return web3.toAscii(stringToConvert).replace(/\u0000/g, '');
  }

  it(testTitle('Should give the deployed User'), async () => {
    assert.equal(bytes32ToString(await contract.name.call()), 'mario');
    assert.equal(bytes32ToString(await contract.surname.call()), 'rossi');

    assert.equal(await contract.publicAddress.call(), accounts[0]);
  });
});

/*

  it(testTitle('Chai assert module test: Should add a new user with name gianfranco!'), async () => {
    const transactionStudentCreation = await contract.createStudent('gianfranco', 'surnamecarino');

    assert.equal(transactionStudentCreation.logs[0].event, 'NewStudentAdded');

    const addrStud = transactionStudentCreation.logs[0].args.studentAddr;

    assert.equal(bytes32ToString(await contract.getStudentName.call(addrStud)), 'gianfranco');
  });

 */
