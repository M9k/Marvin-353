
import UniversityAdmin from './UniversityAdmin';

function getAdmin(adminIndex) {
  const contractUniversityAdmin = UniversityAdmin();

  return contractUniversityAdmin.then(instance =>
    // Call the university getAdmin function
    instance.getAdminAt.call(
      adminIndex,
      { from: web3.eth.accounts[0] },
    )).then(adminAddress => adminAddress);
}

export default getAdmin;

