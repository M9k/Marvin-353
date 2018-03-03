import React from 'react';
import Header from './global/Header';

const Logout = () => {
  document.title = 'Logout - Marvin';
  return (
    <div className="page-logout">
      <Header />
      <h1 className="title">Logout</h1>
      <p>To logout from Marvin, you have to logout from MetaMask:
        <ul>
          <li>Click on MetaMask plug-in icon;</li>
          <li>Click on the menu button in the top right corner;</li>
          <li>Click &#39;Log Out&#39;.</li>
        </ul>
        More information <a href="/help#logout">here</a>.
      </p>
    </div>
  );
};

export default Logout;
