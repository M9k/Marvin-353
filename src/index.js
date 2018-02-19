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
  .catch(() => {
    console.log('React should display the guide to install Metamask!');
    // eslint-disable-next-line no-trailing-spaces,no-alert
    alert('Install METAMASK');
    // this.props.history.push('/install');//un componente install con la guida metamask tolta da help?
    // senza andare su Home che lancia eccezione
  });


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
