const contract = require('truffle-contract');
const contractUniversityJson = require('../../build/contracts/UniversityExam.json');

function getUniversity() {
  const contractUniversity = contract(contractUniversityJson);
  contractUniversity.setProvider(web3.currentProvider);
  return contractUniversity.deployed();
}

function isUniversityFounder(address) {
  console.log('isUniversityFounder');
  const contractUniversityAdmin = getUniversity();
  return contractUniversityAdmin.then(instance =>
    instance.isUniversityFounder(address));
}

function getRoleByAddress(address) {
  console.log('isUniversityFounder');
  const contractUniversityAdmin = getUniversity();
  return contractUniversityAdmin.then(instance =>
    instance.getRoleByAddress(address));
}

function login() {
  console.log('isUniversityFounder');
  const contractUniversityAdmin = getUniversity();
  return contractUniversityAdmin.then(instance =>
    instance.login({ from: web3.eth.accounts[0] }));
}

export { isUniversityFounder, getRoleByAddress, login };
