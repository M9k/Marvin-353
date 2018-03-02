import UniversityAdmin from './UniversityAdmin';

function addAdmin(myAddress, addressToAdd) {
  console.log(`adding ${addressToAdd}`);
  const contractUniversityAdmin = UniversityAdmin();
  return contractUniversityAdmin.then(instance =>
    // Call the university addAdmin function
    instance.newAdmin(addressToAdd, { from: myAddress }));
}

export default addAdmin;

