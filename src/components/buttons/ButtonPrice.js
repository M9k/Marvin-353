import React from 'react';
import Button from './Button';
import { store } from '../../store';

const ButtonPrice = () => {
  if (typeof store.getState().routing.locationBeforeTransitions.pathname !== 'undefined' &&
    store.getState().routing.locationBeforeTransitions.pathname === '/price') {
    return (
      <span className="btn btn-default-select">
        Price
      </span>
    );
  }
  return (
    <Button link="/price">
      Price
    </Button>
  );
};

export default ButtonPrice;
