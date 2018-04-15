import React from 'react';

const NotFound = () => {
  document.title = '404 - Marvin';

  return (
    <div>
      <h3 className="text-center">404 Not Found!</h3>
      <img alt="" className="img-responsive imageIndexTop" src="/media/cards/404.png" />
    </div>
  );
};

export default (NotFound);
