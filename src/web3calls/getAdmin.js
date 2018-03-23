import UniversityAdmin from './UniversityAdmin';

function getAdmin(adminIndex) {
  const contractUniversityAdmin = UniversityAdmin();

  return contractUniversityAdmin.then(instance =>
    // Call the university getAdmin function
    instance.getAdminAt.call(adminIndex)).then(adminAddress => adminAddress).catch(() => {
    console.log('failed to get admin infos!');
  });
}

export default getAdmin;

