import Web3 from 'web3';
import AccountTypes from '../components/AccountEnum';

// console.log(source);
// const contracts = JSON.parse(source).contracts;
// const contrattoUni = new Web3.eth.Contract('contracts/University.json');

function funzioneTest() {
  // TODO: da fare all'avvio, non ad ogni chiamata, qui solo per test
  // const contractUniversityJson = CARICA JSON IN QUALCHE MODO('contracts/University.json');
  // console.log(contractUniversityJson);
  // controllo sia nel formato corretto, deve apparire come
  /*
  {
      name: 'myMethod',
      type: 'function',
      inputs: [{
        type: 'uint256',
        name: 'myNumber'
      },{
        type: 'string',
        name: 'myString'
      }]
    }
   */

  // lo converto in ABI
  // const contractUniversityABI = Web3.eth.abi.encodeFunctionSignature(contractUniversityJson);
  // console.log(contractUniversity);

  // creo il contratto
  // const contractUniversity = web3.eth.contract(contractUniversityABI);

  // indico il suo indirizzo sulla rete
  // contractUniversity.options.address = '0x01235f2ab45345.....';

  // invoco il login
  // contractUniversity.methods.metodo_di_login([parametri... ]).then({ function(result){ ...  });});

  return 2;
}

export default funzioneTest;
