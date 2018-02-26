const University = artifacts.require('./UniversityAdmin.sol');

module.exports = function (deployer) {
  deployer.deploy(University);
};
