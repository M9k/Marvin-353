import UniversityAdmin from './UniversityAdmin';

function login(myAddress) {
  const contractUniversityAdmin = UniversityAdmin();

  return contractUniversityAdmin.then(instance =>
    // Call the university login function

    instance.login.call({ from: myAddress })).then(accountType => accountType);
}

export default login;

