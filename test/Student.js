/*
const Student = artifacts.require('./contracts/Student.sol');
const assert = require('chai').assert;

contract('Student', (accounts) => {
  let contract;
  let test = 0;
  let testN = '';

  beforeEach('Deploy Student contract on blockchain', async () => {
    contract = await Student.deployed({ from: accounts[0] });
  });

  function testTitle(_testT) {
    test += 1;// next test
    testN = test.toString().padStart(3, '0');
    return `${testN} - ${_testT}`;
  }

  function bytes32ToString(stringToConvert) {
    return web3.toAscii(stringToConvert).replace(/\u0000/g, '');
  }

  it(testTitle('Chai assert module test: Should give the deployed student'), async () => {
    assert.equal(bytes32ToString(await contract.name.call()), 'mario');
    assert.equal(bytes32ToString(await contract.surname.call()), 'rossi');

    assert.equal(await contract.creator.call(), accounts[0]);
  });
});

*/
