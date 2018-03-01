import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const ButtonPrice = (props) => {
  if (props.path === '/price') {
    return (
      <span className="btn btn-default-select">
        Price
      </span>
    );
  }
  return (
    <Button link="/price">
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

