import UniversityAdmin from './UniversityAdmin';

function numAdmin() {
  const contractUniversityAdmin = UniversityAdmin();

  return contractUniversityAdmin.then(instance =>
    // Call the university getAdminsNumber function
    instance.getAdminsNumber.call().then(num => num));
}

export default numAdmin;

