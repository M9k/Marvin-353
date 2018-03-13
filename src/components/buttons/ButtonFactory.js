import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ButtonToolbar } from 'react-bootstrap';
import ButtonPrice from './ButtonPrice';
import ButtonHelp from './ButtonHelp';
import ButtonLogOut from './ButtonLogOut';
import AccountTypes from '../AccountEnum';

const ButtonFactory = (props) => {
  switch (props.accountType) {
    case AccountTypes.UNIVERSITY:
    case AccountTypes.ADMIN:
    case AccountTypes.PROFESSOR:
    case AccountTypes.STUDENT:
      return (
        <ButtonToolbar>
          <ButtonPrice path={props.path} />
          <ButtonHelp path={props.path} />
          <ButtonLogOut path={props.path} />
        </ButtonToolbar>
      );
    case AccountTypes.NOTLOGGED:
      return (
        <ButtonToolbar id="ButtonGroup">
          <ButtonPrice path={props.path} />
          <ButtonHelp path={props.path} />
        </ButtonToolbar>
      );
    default:
      return (
        <ButtonToolbar />
      );
  }
};

ButtonFactory.propTypes = {
  accountType: PropTypes.oneOf(Object.values(AccountTypes)).isRequired,
  path: PropTypes.string,
};

ButtonFactory.defaultProps = {
  path: '/',
};

const mapStateToProps = state => ({
  path: state.routing.locationBeforeTransitions.pathname,
});

export default connect(mapStateToProps)(ButtonFactory);
