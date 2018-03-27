const contract = require('truffle-contract');
const contractUniversityJson = require('../../build/contracts/UniversityExam.json');

function UniversityAdmin() {
  const contractUniversity = contract(contractUniversityJson);

  contractUniversity.setProvider(web3.currentProvider);

  return contractUniversity.deployed();
}

export default UniversityAdmin;

