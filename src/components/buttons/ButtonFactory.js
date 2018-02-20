import React from 'react';
import PropTypes from 'prop-types';
import ButtonPrice from './ButtonPrice';
import ButtonHelp from './ButtonHelp';
import ButtonLogOut from './ButtonLogOut';
import AccountTypes from '../AccountEnum';

const ButtonFactory = (props) => {
  switch (props.AccountType) {
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

ButtonFactory.ButtonFactory = {
  AccountType: PropTypes.oneOf(Object.keys(AccountTypes)).isRequired,
};

export default ButtonFactory;

