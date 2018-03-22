import UniversityAdmin from './UniversityAdmin';

function numAdmin() {
  const contractUniversityAdmin = UniversityAdmin();

  return contractUniversityAdmin.then(instance =>
    // Call the university getAdminsNumber function
    instance.getAdminNumber.call());
}

export default numAdmin;

