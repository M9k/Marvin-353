import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const ButtonLogOut = (props) => {
  if (props.path === '/logout') {
    return (
      <span className="btn btn-default-select">
        Logout
      </span>
    );
  }
  return (
    <Button href="/logout">
      Logout
    </Button>
  );
};

ButtonLogOut.propTypes = {
  path: PropTypes.string,
};

ButtonLogOut.defaultProps = {
  path: '/',
};

export default ButtonLogOut;

