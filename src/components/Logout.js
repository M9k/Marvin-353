import React from 'react';
import Header from './global/Header';
import LoggingOut from './load/LoggingOut';

const Logout = () => {
  document.title = 'Logout - Marvin';
  return (
    <div className="page-logout">
      <Header />
      <h2>TODO: guida su come sloggare da Metamask, il resto è automatico</h2>
    </div>
  );
};

export default Logout;
