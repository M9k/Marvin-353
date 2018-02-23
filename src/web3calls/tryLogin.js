// import Web3 from 'web3';
// import AccountTypes from '../components/AccountEnum';

const contract = require('truffle-contract');

function funzioneTest() {
  let returnType = 0;
  // TODO: da spostare
  const contractUniversityJson = require('../../build/contracts/University.json');

  const contractUniversity = contract(contractUniversityJson);
  contractUniversity.setProvider(web3.currentProvider);

  contractUniversity.deployed().then((instance) => {
    // Attempt to login user.
    instance.login()
      .then((result) => {
      // If no error, login user.
        alert(`result network ${(result)}`);
        returnType = result; // TODO - ERRORE! il valore è assegnato dopo il ritorno
      });
  });
  return returnType;
}

export default funzioneTest;
