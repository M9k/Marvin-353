import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import router from './router';
import Footer from './components/global/Footer';
import './stylesheets/main.scss';

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
