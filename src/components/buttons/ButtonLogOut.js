import React from 'react';
import Button from './Button';
import { store } from '../../store';

const ButtonBackToHome = () => {
  if (typeof store.getState().routing.locationBeforeTransitions.pathname !== 'undefined' &&
    store.getState().routing.locationBeforeTransitions.pathname === '/logout') {
    return (
      <span className="btn btn-default-select">
        Logout
      </span>
    );
  }
  return (
    <Button link="/logout/">
      Logout
    </Button>
  );
};

export default ButtonBackToHome;
