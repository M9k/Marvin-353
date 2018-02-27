const UniversityBase = artifacts.require('./UniversityBase.sol');
const UniversityAdmin = artifacts.require('./UniversityAdmin.sol');

module.exports = function (deployer) {
  //ONLY FOR SOLTEST! NOT FOR DEPLOY
  deployer.deploy(UniversityBase);
  //ONLY FOR SOLTEST! NOT FOR DEPLOY
  deployer.link(UniversityBase, UniversityAdmin);
  deployer.deploy(UniversityAdmin);
};
