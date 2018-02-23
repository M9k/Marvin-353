import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const ButtonHelp = (props) => {
  if (props.path === '/help') {
    return (
      <span className="btn btn-default-select">
        Help
      </span>
    );
  }
  return (
    <Button link="/help">
      Help
    </Button>
  );
};

ButtonHelp.propTypes = {
  path: PropTypes.string,
};

ButtonHelp.defaultProp = {
  path: '/',
};

export default ButtonHelp;
