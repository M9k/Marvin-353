import UniversityAdmin from './UniversityAdmin';

function numAdmin() {
  const contractUniversityAdmin = UniversityAdmin();

  return contractUniversityAdmin.then(instance =>
    // Call the university getAdminsNumber function
    instance.getAdminsNumber.call()).catch((err) => {
    console.log('cannot get admin number');
  });
}

export default numAdmin;

