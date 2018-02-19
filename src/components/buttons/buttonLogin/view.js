import React from 'react';
import Button from '../Button';

const view = ({ onLoginUserClick }) => (
  <Button link="/#" onClick={event => onLoginUserClick(event)}>
      Login onClick Redux
  </Button>
);

view.propTypes = {
  onLoginUserClick: React.PropTypes.func.isRequired,
};

export default view;
