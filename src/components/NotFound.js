import React from 'react';
import Header from './global/Header';

// Not found page component
const NotFound = () => {
  document.title = 'Not Found! - Marvin';
  return (
    <div className="page-not-found">
      <Header />
      <h1>Page not found!</h1>
    </div>
  );
};

export default NotFound;
