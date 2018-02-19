import React from 'react';
import Button from '../Button';

/* onClick doesn't work here, it doesn't trigger the event */
const view = ({ onLoginUserClick }) => (
  <Button link="/#" onClick={event => onLoginUserClick(event)}>
      Login onClick Redux
  </Button>
);

/* props need to be declared */
view.propTypes = {
  onLoginUserClick: React.PropTypes.func.isRequired,
};

export default view;
