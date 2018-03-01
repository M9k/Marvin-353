import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const ButtonPrice = (props) => {
  if (props.path === '/price') {
    return (
      <span className="btn btn-default-select">
        Price
      </span>
    );
  }
  return (
    <Button href="/price">
      Price
    </Button>
  );
};

ButtonPrice.propTypes = {
  path: PropTypes.string,
};

ButtonPrice.defaultProps = {
  path: '/',
};

export default ButtonPrice;

