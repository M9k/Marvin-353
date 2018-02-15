import React from 'react';
import ButtonBackToHome from './buttons/ButtonBackToHome';
import Header from './global/Header';

// Not found page component
const NotFound = () => (
  <div className="page-not-found">
    <Header />
    <h1>Page not found!</h1>
    <ButtonBackToHome />
  </div>
);

export default NotFound;
