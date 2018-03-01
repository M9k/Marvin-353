import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const ButtonHelp = (props) => {
  if (props.path === '/help') {
    return (
      <span className="btn btn-default-select">
        Help
      </span>
    );
  }
  return (
    <Button href="/help">
      Help
    </Button>
  );
};

ButtonHelp.propTypes = {
  path: PropTypes.string,
};

ButtonHelp.defaultProps = {
  path: '/',
};

export default ButtonHelp;
