const contract = require('truffle-contract');

function UniversityAdmin() {
  const contractUniversityJson = require('../../build/contracts/UniversityAdmin.json');

  const contractUniversity = contract(contractUniversityJson);

  contractUniversity.setProvider(web3.currentProvider);

  return contractUniversity;
}

export default UniversityAdmin;

