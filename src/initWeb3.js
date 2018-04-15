import getWeb3 from './util/web3/getWeb3';
import { store } from './store';
import { creators } from './ducks/Metamask';
import { creators as sessionCreators } from './ducks/Session';

const initWeb3 = () => {
  let account = null;

  // init web3
  let web3 = getWeb3.then((results) => {
    web3 = results;
    [account] = [web3.eth.accounts[0]];
    store.dispatch(creators.setAddress(web3.eth.accounts[0]));
  }).catch(() => {
    store.dispatch(creators.notFound());
  });


  setInterval(() => {
    if (account !== null && web3.eth.accounts[0] !== account) {
      [account] = [web3.eth.accounts[0]];
      store.dispatch(creators.logout());
      store.dispatch(creators.setAddress(web3.eth.accounts[0]));
      store.dispatch(sessionCreators.cleanData());

      // redirect with blacklist
      if (
        window.location.pathname !== '/price' &&
        window.location.pathname !== '/help' &&
        window.location.pathname !== '/license' &&
        window.location.pathname !== '/'
      ) {
        window.location.replace('/');
      }
      console.log('Switched account!');
    }
  }, 100);
};

export default initWeb3;
