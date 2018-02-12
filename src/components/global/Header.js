import React from 'react';
import PropTypes from 'prop-types';

const Header = props => (
  <div id="header">
    <div id="headerWelcome">{props.welcome}</div>
    <div id="headerLinks">{props.children}</div>
  </div>
);

Header.propTypes = {
  welcome: PropTypes.string,
  children: PropTypes.node,
};

Header.defaultProps = {
  welcome: 'Welcome',
  children: '',
};

export default Header;
