
import UniversityAdmin from './UniversityAdmin';

function addAdmin(addressToAdd) {
  alert(`I'm going to add you -> ${addressToAdd}`);

  const contractUniversityAdmin = UniversityAdmin();

  return contractUniversityAdmin.then(instance =>
    // Call the university addAdmin function
    instance.newAdmin(
      addressToAdd,
      { from: web3.eth.accounts[0] },
    ));
}

export default addAdmin;

