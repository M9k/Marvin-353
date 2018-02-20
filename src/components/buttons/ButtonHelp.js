import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';

const ButtonHelp = (props) => {
  if (props.active === '/help') {
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
  active: PropTypes.string,
};

ButtonHelp.defaultProp = {
  active: '/',
};

const mapStateToProps = state => ({
  active: state.routing.locationBeforeTransitions.pathname,
});

export default connect(mapStateToProps)(ButtonHelp);
