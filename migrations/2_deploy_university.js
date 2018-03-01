const User = artifacts.require('./User.sol');

const UniversityBase = artifacts.require('./UniversityBase.sol');
const UniversityAdmin = artifacts.require('./UniversityAdmin.sol');

module.exports = function (deployer) {
  deployer.deploy(User, 'mario', 'rossi');

  // ONLY FOR SOLTEST! NOT FOR DEPLOY
  deployer.deploy(UniversityBase);
  // ONLY FOR SOLTEST! NOT FOR DEPLOY
  deployer.link(UniversityBase, UniversityAdmin);
  deployer.deploy(UniversityAdmin);
};
