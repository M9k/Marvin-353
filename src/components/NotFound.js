import React from 'react';

// Not found page component
const NotFound = () => {
  document.title = 'Not Found! - Marvin';
  return (
    <div className="page-not-found">
      <h1>Page not found!</h1>
    </div>
  );
};

export default NotFound;
