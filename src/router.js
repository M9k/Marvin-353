import React from 'react';
import { Router } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { history } from './store';

import routes from './routes';
import routesStudent from './routesAdmin';
import { selectors } from './ducks/Session';

// build the router
const router = (props) => {
  if (props.isLogged === true) {
    return (
      <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
        {routesStudent}
      </Router>
    );
  }
  return (
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
      {routes}
    </Router>
  );
};

router.propTypes = {
  isLogged: PropTypes.bool,
};

router.defaultProps = {
  isLogged: false,
};

const mapStateToProps = state => ({
  isLogged: selectors.isLogged(state),
});

export default connect(mapStateToProps)(router);
