
import UniversityAdmin from './UniversityAdmin';

function numAdmin() {
  const contractUniversityAdmin = UniversityAdmin();

  return contractUniversityAdmin.then(instance =>
    // Call the university getAdminsNumber function
    instance.getAdminsNumber.call({ from: web3.eth.accounts[0] })).then(adminNumber => adminNumber);
}

export default numAdmin;

