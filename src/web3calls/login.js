import UniversityAdmin from './UniversityAdmin';

function login() {
  const admin = UniversityAdmin();

  return admin.deployed().then(instance =>
    // Call the university login function
    instance.login.call({ from: web3.eth.accounts[0] })).then(accountType => accountType);
}

export default login;

