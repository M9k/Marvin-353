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
// poi connect con il main, così quando l'account cambia il setInterval lo rileva e fa ricaricare
// tutta la pagina automaticamente, senza bisogno di azioni extra
let account = null; // TODO REDUX

let web3 = getWeb3.then((results) => {
  web3 = results;
  account = web3.eth.accounts[0]; // TODO REDUX
  console.log(account); // TODO DEBUG ONLY - DA RIMUOVERE
});

const checkSwitchAccount = setInterval(() => {
  if (account !== null && web3.eth.accounts[0] !== account) {
    account = web3.eth.accounts[0]; // TODO REDUX
    console.log('SWITCH ACCOUNT!'); // TODO DEBUG ONLY - DA RIMUOVERE
    console.log(account); // TODO DEBUG ONLY - DA RIMUOVERE
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
