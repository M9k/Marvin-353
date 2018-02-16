module.exports = {
  norpc: true,
  compileCommand: '../node_modules/.bin/truffle compile --network coverage',
  testCommand: '../node_modules/.bin/truffle test test/contracts/* --network coverage',
  port: 8545
};
