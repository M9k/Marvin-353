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
    let web3;

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(window.web3.currentProvider);
    } else {
      // Fallback to localhost if no web3 injection. We've configured this to
      // use the development console's port by default.
      const provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
      web3 = new Web3(provider);
    }

    const results = {
      web3Instance: web3,
    };

    console.log('Injected web3 detected.');
    // TODO: succede solo nel caso l'if sopra sia soddisfatto (se c'è Metamask)
    // TODO: altrimenti il redux funziona correttamente ed assegna l'oggetto nello store
    console.log(web3);
    resolve(store.dispatch(web3Initialized(results)));
    console.log('Store updated');
  });
}));

export default getWeb3;
