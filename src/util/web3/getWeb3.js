import Web3 from 'web3';

const getWeb3 = new Promise(((resolve, reject) => {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', (dispatch) => {
    let web3;

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log('No Metamask!');
    }
    if (web3 === undefined) {
      console.log('Metamask locked or no Metamask');
    } else {
      console.log('Metamask!');
    }
    resolve(web3);
  });
}));

export default getWeb3;
