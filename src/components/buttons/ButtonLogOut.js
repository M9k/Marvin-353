import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const ButtonBackToHome = (props) => {
  if (props.path === '/logout/') {
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
  path: PropTypes.string,
};

ButtonBackToHome.defaultProp = {
  path: '/',
};

export default ButtonBackToHome;

