import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';

const ButtonPrice = (props) => {
  if (props.active === '/price') {
    return (
      <span className="btn btn-default-select">
        Price
      </span>
    );
  }
  return (
    <Button link="/price/">
      Price
    </Button>
  );
};

ButtonPrice.propTypes = {
  active: PropTypes.string,
};

ButtonPrice.defaultProp = {
  active: '/',
};

const mapStateToProps = state => ({
  active: state.routing.locationBeforeTransitions.pathname,
});

export default connect(mapStateToProps)(ButtonPrice);

