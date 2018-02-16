module.exports = {
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777"
    },
    coverage: {
      /* Per il coverage, ma anche per i test in generale, potremmo usare testrpc (che usa ganache)
       per fissare una mnemonica in modo da avere sempre gli stessi account su cui fare i test"
       */
      host: "localhost",
      network_id: "*",
      port: 8545
    }
  }
};
