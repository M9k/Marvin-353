import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import { Provider } from 'react-redux';
import { store } from './store';
import router from './router';
import Footer from './components/global/Footer';
import './stylesheets/main.scss';

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

// https://www.codeooze.com/blockchain/ethereum-block-explorer-react-02/
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
