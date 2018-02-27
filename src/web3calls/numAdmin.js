
import UniversityAdmin from './UniversityAdmin';

function numAdmin() {
  const admin = UniversityAdmin();

  return admin.deployed().then(instance =>
    // Call the university getAdminsNumber function
    instance.getAdminsNumber.call({ from: web3.eth.accounts[0] })).then(adminNumber => adminNumber);
}

export default numAdmin;

