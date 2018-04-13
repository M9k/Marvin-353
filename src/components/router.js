import React from 'react';
import { Router } from 'react-router';
import PropTypes from 'prop-types';
import CreateRoutes from './Factory';
import { history } from '../store';
import PublicRoutes from './routes/PublicRoutes';

// build the router
const router = (props) => {
  console.log(props.userType);
  if (props.isLogged) {
    return (
      <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
        {CreateRoutes(props.userType)};
      </Router>
    );
  }
  return (
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
      {PublicRoutes}
    </Router>
  );
};

router.propTypes = {
  isLogged: PropTypes.bool,
  userType: PropTypes.number,
};

router.defaultProps = {
  isLogged: false,
  userType: 0,
};

export default router;
