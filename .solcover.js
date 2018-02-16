module.exports = {
  norpc: true,
  compileCommand: '../node_modules/.bin/truffle compile --network coverage',
  testCommand: '../node_modules/.bin/truffle test test/_contracts/* --network coverage',
  port: 8545
};
