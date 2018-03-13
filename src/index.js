import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import initWeb3 from './initWeb3';
import { store, persistor } from './store';
import router from './router';
import Footer from './components/global/Footer';
import './stylesheets/main.scss';

initWeb3();

// init contracts
// TODO - Singleton?

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
