import React from 'react';
import Header from './global/Header';
import LoggingOut from './load/LoggingOut';

const Logout = () => {
  document.title = 'Logout - Marvin';
  return (
    <div className="page-logout">
      <Header />
      <LoggingOut/>
    </div>
  );
};

export default Logout;
