import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import router from './router';
import Footer from './components/global/Footer';
import './stylesheets/main.scss';
import getWeb3 from './util/web3/getWeb3';

// TODO: account nello stato Redux
let account = null;

let web3 = getWeb3.then((results) => {
  web3 = results;
  account = web3.eth.accounts[0]; // TODO REDUX
  console.log(account); // TODO DEBUG ONLY
});

const checkSwitchAccount = setInterval(() => {
  if (account !== null && web3.eth.accounts[0] !== account) {
    account = web3.eth.accounts[0]; // TODO REDUX
    console.log('SWITCH ACCOUNT!'); // TODO DEBUG ONLY
    console.log(account); // TODO DEBUG ONLY
  }
}, 100);

// render the main component
ReactDOM.render(
  <div id="page">
    <Provider store={store}>
      {router}
    </Provider>
    <Footer />
  </div>,
  document.getElementById('app'),
);
