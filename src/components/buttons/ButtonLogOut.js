import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const ButtonLogOut = (props) => {
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

ButtonLogOut.propTypes = {
  path: PropTypes.string,
};

ButtonLogOut.defaultProp = {
  path: '/',
};

export default ButtonLogOut;

