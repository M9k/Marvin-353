import React from 'react';
import Button from './Button';
import { store } from '../../store';

const ButtonHelp = () => {
  if (typeof store.getState().routing.locationBeforeTransitions.pathname !== 'undefined' &&
    store.getState().routing.locationBeforeTransitions.pathname === '/help') {
    return (
      <span className="btn btn-default-select">
        Help
      </span>
    );
  }
  return (
    <Button link="/help/">
      Help
    </Button>
  );
};

export default ButtonHelp;
