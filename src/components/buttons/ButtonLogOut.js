import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const ButtonLogOut = (props) => {
  if (props.path === '/logout') {
    return (
      <Button active>
        Logout
      </Button>
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

