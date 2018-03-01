import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
        <div id="ButtonGroup">
          <ButtonPrice path={props.path} />
          <ButtonHelp path={props.path} />
          <ButtonLogOut path={props.path} />
        </div>
      );
    case AccountTypes.NOTLOGGED:
      return (
        <div id="ButtonGroup">
          <ButtonPrice path={props.path} />
          <ButtonHelp path={props.path} />
        </div>
      );
    default:
      return (
        <div id="ButtonGroup" />
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
