import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Router from './containers/router';
import { persistor } from './store';

const Page = props => (
  <div id="page">
    <Provider store={props.store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  </div>
);

Page.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line
};

export default Page;
