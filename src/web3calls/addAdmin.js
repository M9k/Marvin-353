import UniversityAdmin from './UniversityAdmin';

function addAdmin(addressToAdd) {
  console.log(`adding ${addressToAdd}`);
  const contractUniversityAdmin = UniversityAdmin();
  return contractUniversityAdmin.then(instance =>
    // Call the university addAdmin function
    instance.addNewAdmin(addressToAdd, { from: web3.eth.accounts[0] }));
}

export default addAdmin;

