import UniversityAdmin from './UniversityAdmin';

function numAdmin() {
  const contractUniversityAdmin = UniversityAdmin();

  return contractUniversityAdmin.then(instance =>
    // Call the university getAdminsNumber function
    instance.getAdminsNumber.call()).catch(() => {
    console.log('cannot get admin number');
  });
}

export default numAdmin;

