import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ButtonPrice from './ButtonPrice';
import ButtonHelp from './ButtonHelp';
import ButtonLogOut from './ButtonLogOut';
import AccountTypes from '../AccountEnum';

const ButtonFactory = (props) => {
  switch (props.accountType) {
    case null:
    case AccountTypes.NOTLOGGED:
      return (
        <div id="ButtonGroup">
          <ButtonPrice />
          <ButtonHelp />
        </div>
      );
    case AccountTypes.UNIVERSITY:
    case AccountTypes.ADMIN:
    case AccountTypes.PROFESSOR:
    case AccountTypes.STUDENT:
      return (
        <div id="ButtonGroup">
          <ButtonPrice />
          <ButtonHelp />
          <ButtonLogOut />
        </div>
      );
    default:
      return (
        <div id="ButtonGroup" />
      );
  }
};

ButtonFactory.propTypes = {
  accountType: PropTypes.oneOf(Object.values(AccountTypes)),
};

ButtonFactory.defaultProp = {
  accountType: null,
};

const mapStateToProps = state => ({
  accountType: state.user.role,
});

export default connect(mapStateToProps)(ButtonFactory);
