import React from 'react';
import PropTypes from 'prop-types';
import ImageLabel from './ImageLabel';

const WelcomeLabel = props => (
  <a href="/" title="Go to the home">
    <ImageLabel image="/media/logo.png" text={props.text} alt="Marvin logo" />
  </a>
);

WelcomeLabel.propTypes = {
  text: PropTypes.string.isRequired,
};

export default WelcomeLabel;
