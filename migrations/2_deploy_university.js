const UniversityBase = artifacts.require('./UniversityBase.sol');

const UniversityAdmin = artifacts.require('./UniversityAdmin.sol');

module.exports = function (deployer) {
  deployer.deploy(UniversityBase);
  deployer.link(UniversityBase,UniversityAdmin);
  deployer.deploy(UniversityAdmin);
};
