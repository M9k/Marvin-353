import React from 'react';
import ButtonPrice from './buttons/ButtonPrice';
import ButtonBackToHome from './buttons/ButtonBackToHome';
import Header from './global/Header';

const Help = () => (
  <div className="page-home">
    <Header>
      <ButtonPrice />
    </Header>
    <h1>Help</h1>
    <p>TODO</p>
    <ButtonBackToHome />
  </div>
);

export default Help;
