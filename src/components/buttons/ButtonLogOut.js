import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';

const ButtonBackToHome = (props) => {
  if (props.active === '/logout') {
    return (
      <span className="btn btn-default-select">
        Logout
      </span>
    );
  }
  return (
    <Button link="/logout/">
      Logout
    </Button>
  );
};

ButtonBackToHome.propTypes = {
  active: PropTypes.string,
};

ButtonBackToHome.defaultProp = {
  active: '/',
};

const mapStateToProps = state => ({
  active: state.routing.locationBeforeTransitions.pathname,
});

export default connect(mapStateToProps)(ButtonBackToHome);

