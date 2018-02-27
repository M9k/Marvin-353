const UniversityAdmin = artifacts.require('./UniversityAdmin.sol');

module.exports = function (deployer) {
  //deployer.link(UniversityBase, UniversityAdmin);
  deployer.deploy(UniversityAdmin);
};
