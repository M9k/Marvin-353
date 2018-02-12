import React from 'react';
import PropTypes from 'prop-types';
import WelcomeLabel from '../label/WelcomeLabel';

const Header = props => (
  <div id="header">
    <WelcomeLabel id="headerWelcome" text={props.welcome} />
    <div id="headerLinks">{props.children}</div>
  </div>
);

Header.propTypes = {
  welcome: PropTypes.string,
  children: PropTypes.node,
};

Header.defaultProps = {
  welcome: 'Welcome to Marvin',
  children: '',
};

export default Header;
