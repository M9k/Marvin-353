const contract = require('truffle-contract');

function tryLoginWeb3() {
  // TODO: da spostare in un Singleton --> Definire bene l'architettura
  const contractUniversityJson = require('../../build/contracts/University.json');
  // Set up the contract abstraction
  const contractUniversity = contract(contractUniversityJson);
  // Set the provider used by metamask
  contractUniversity.setProvider(web3.currentProvider);
  // Deploy a contract instance on the network or use the one specified in json
  return contractUniversity.deployed().then(instance =>
    // Call the university login function
    instance.login.call({ from: web3.eth.accounts[0] })).then(accountType => accountType);
}

export default tryLoginWeb3;

