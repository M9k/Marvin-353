// import Web3 from 'web3';
// import AccountTypes from '../components/AccountEnum';

const contract = require('truffle-contract');

function tryLoginWeb3() {
  // TODO: da spostare in un Singleton
  const contractUniversityJson = require('../../build/contracts/University.json');

  const contractUniversity = contract(contractUniversityJson);
  contractUniversity.setProvider(web3.currentProvider);

  return contractUniversity.deployed().then(instance =>
    // Attempt to login user.
    instance.login.call({ from: web3.eth.accounts[0] })).then(result => result);
}

export default tryLoginWeb3;
