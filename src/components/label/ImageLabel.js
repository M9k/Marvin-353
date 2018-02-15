import React from 'react';
import PropTypes from 'prop-types';
import '../../stylesheets/imageLabel.scss';

const ImageLabel = props => (
  <div className="imageLabel">
    <img className="image" src={props.image} alt={props.alt} />
    <p className="text">
      {props.text}
    </p>
  </div>
);

ImageLabel.propTypes = {
  text: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

ImageLabel.defaultProps = {
  alt: '',
};

export default ImageLabel;
