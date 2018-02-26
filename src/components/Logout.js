import React from 'react';
import Header from './global/Header';

const Logout = () => {
  document.title = 'Logout - Marvin';
  return (
    <div className="page-logout">
      <Header />
      <h1 class="title">Logout</h1>
      <p>For logout from Marvin, you have to logout from MetaMask:
        <ul>
          <li>Click on MetaMask plug-in icon;</li>
          <li>Click on the menu button in the top right corner;</li>
          <li>Click 'Log Out'.</li>
        </ul>
      </p>
    </div>
  );
};

export default Logout;
