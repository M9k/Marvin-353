// import Web3 from 'web3';
// import AccountTypes from '../components/AccountEnum';

const contract = require('truffle-contract');

function funzioneTest() {
  let returnType = 0;
  // TODO: da spostare
  const contractUniversityJson = require('../../build/contracts/University.json');

  const contractUniversity = contract(contractUniversityJson);
  contractUniversity.setProvider(web3.currentProvider);

  return contractUniversity.deployed().then((instance) => {
    // Attempt to login user.
    return instance.login();
  }).then((result) => {
    return result;
  });
  //return returnType;
}

export default funzioneTest;
