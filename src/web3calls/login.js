import UniversityAdmin from './UniversityAdmin';

function login() {
  const contractUniversityAdmin = UniversityAdmin();

  return contractUniversityAdmin.then(instance =>
    // Call the university login function
    instance.login.call({ from: web3.eth.accounts[0] })).then(accountType => accountType)
    .then(() => {
      console.log('ti sei loggato correttamente');
    }).catch(() => {
      console.log('ooops problems');
    });
}

export default login;
