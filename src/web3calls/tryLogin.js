// import Web3 from 'web3';
// import AccountTypes from '../components/AccountEnum';

const contract = require('truffle-contract');

function funzioneTest() {
  let returnType = 0;
  // TODO: da spostare
  const contractUniversityJson = require('../../build/contracts/University.json');

  const contractUniversity = contract(contractUniversityJson);
  contractUniversity.setProvider(web3.currentProvider);

  console.log(contractUniversity);

  web3.eth.getCoinbase((error, coinbase) => {
    // Log errors, if any.
    if (error) {
      console.error(`account metamask ${error}`);
    }
    contractUniversity.deployed().then((instance) => {
      // Attempt to login user.
      instance.login({ from: coinbase })
        .then((result) => {
        // If no error, login user.
          alert(`result network ${(result)}`);
          returnType = result; // TODO -  ERRORE! il valore è assegnato dopo il ritorno
        });
    });
  });
  return returnType;
}

export default funzioneTest;
