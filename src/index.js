import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import router from './router';
import Footer from './components/global/Footer';
import './stylesheets/main.scss';
import getWeb3 from './util/web3/getWeb3';
import { userAction } from './reducers/user';

let account = null;

// init web3
let web3 = getWeb3.then((results) => {
  web3 = results;
  account = web3.eth.accounts[0];
  store.dispatch({ type: userAction.METAMASK });
  store.dispatch({ type: userAction.EDIT_ADDRESS, address: web3.eth.accounts[0] });
});

setInterval(() => {
  if (account !== null && web3.eth.accounts[0] !== account) {
    account = web3.eth.accounts[0];
    store.dispatch({ type: userAction.USER_LOGGED_OUT });
    store.dispatch({ type: userAction.EDIT_ADDRESS, address: web3.eth.accounts[0] });
    console.log('SWITCH ACCOUNT!'); // TODO DEBUG ONLY - DA RIMUOVERE
  }
}, 100);

// init contracts
// TODO

// render the main component
ReactDOM.render(
  <div id="page">
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {router}
      </PersistGate>
    </Provider>
    <Footer />
  </div>,
  document.getElementById('app'),
);
