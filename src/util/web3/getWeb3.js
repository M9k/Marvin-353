import Web3 from 'web3';
import { store } from '../../store';

export const WEB3_INITIALIZED = 'WEB3_INITIALIZED';
function web3Initialized(results) {
  return {
    type: WEB3_INITIALIZED,
    web3ActionInstance: results.web3Instance,
  };
}

const getWeb3 = new Promise(((resolve, reject) => {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', (dispatch) => {
    let results;
    let web3 = window.web3;

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(web3.currentProvider);
      results = {
        web3Instance: web3,
      };
    } else {
      // Fallback to localhost if no web3 injection. We've configured this to
      // use the development console's port by default.
      const provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
      web3 = new Web3(provider);
      results = {
        web3Instance: web3,
      };
    }

    console.log('Injected web3 detected.');
    // TODO: succede solo nel caso l'if sopra sia soddisfatto (cioè c'è Metamask)
    // TODO: aggiustare questa chiamata, genera can't prevent extensions on this proxy object
    console.log(web3Initialized(results));
    resolve(store.dispatch(web3Initialized(results)));
    console.log('Store updated');
  });
}));

export default getWeb3;
