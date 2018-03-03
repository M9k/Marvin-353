var HDWalletProvider = require('truffle-hdwallet-provider');

var infura_apikey = 'dJdeB6osExnc9NaMwkkI';
var mnemonic = 'earth muscle flash impose wait paper curtain pigeon observe urge beef caution';

module.exports = {
  networks: {
    develop: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '5777',
    },
    ganache: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '5777',
    },
    coverage: {
      /* Per il coverage, ma anche per i test in generale, potremmo usare testrpc (che usa ganache)
       per fissare una mnemonica in modo da avere sempre gli stessi account su cui fare i test"
       */
      host: 'localhost',
      network_id: '*',
      port: 8545,
      gas: 0xfffffffffff,
      gasPrice: 0x01
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"+infura_apikey),
      network_id: 3,
      gas: 2900000,
    }
  },
  mocha: {
    enableTimeouts: false,
    reporter: 'eth-gas-reporter',
    reporterOptions: {
      currency: 'EUR',
    },
  },
};
