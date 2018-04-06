import UniversityAdmin from './UniversityAdmin';

function addAdmin(addressToAdd) {
  console.log(`adding ${addressToAdd}`);
  console.log(web3.eth.accounts[0]);
  const contractUniversityAdmin = UniversityAdmin();
  return contractUniversityAdmin.then(instance =>
    // Call the university addAdmin function
    instance.newAdmin(addressToAdd, { from: web3.eth.accounts[0] }));
}

export default addAdmin;

