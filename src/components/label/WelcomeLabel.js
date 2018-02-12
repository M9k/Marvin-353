import React from 'react';
import PropTypes from 'prop-types';
import ImageLabel from './ImageLabel';

const WelcomeLabel = props => (
  <ImageLabel image="media/logo.png" text={props.text} alt="Logo" />
);

WelcomeLabel.propTypes = {
  text: PropTypes.string.isRequired,
};

export default WelcomeLabel;
