import UniversityAdmin from './UniversityAdmin';

function removeAdmin(addressToRemove) {
  console.log(`removing ${addressToRemove}`);
  const contractUniversityAdmin = UniversityAdmin();
  return contractUniversityAdmin.then(instance =>
    // Call the university addAdmin function
    instance.removeAdmin(addressToRemove, { from: web3.eth.accounts[0], gas: 60000 }))
    .catch((err) => {
      console.log('cannot remove admin!');
    });
}

export default removeAdmin;

