import React from 'react';
import PropTypes from 'prop-types';
import WelcomeLabel from '../label/WelcomeLabel';
import AccountTypes from '../AccountEnum';
import ButtonFactory from '../buttons/ButtonFactory';

const Header = props => (
  <div id="header">
    <WelcomeLabel id="headerWelcome" text={props.welcome} />
    <div id="headerLinks">
      <ButtonFactory accountType={props.accountType} />
    </div>
  </div>
);

Header.propTypes = {
  welcome: PropTypes.string,
  accountType: PropTypes.oneOf(Object.values(AccountTypes)),
};

Header.defaultProps = {
  welcome: 'Welcome to Marvin',
  accountType: AccountTypes.NOTLOGGED,
};

export default Header;
