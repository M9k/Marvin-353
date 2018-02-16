import React from 'react';
import PropTypes from 'prop-types';

const Button = props => (
  <a className="btn btn-default" href={props.link} >
    {props.children}
  </a>
);

Button.propTypes = {
  link: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
