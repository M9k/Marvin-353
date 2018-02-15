import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import router from './router';
import Footer from './components/global/Footer';
import './stylesheets/main.scss';
import getWeb3 from './util/web3/getWeb3';

let web3;
getWeb3.then((results) => {
  web3 = results;
})
  .catch(() => { console.log('Error in web3 initialization.'); });

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
