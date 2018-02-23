import React from 'react';
import Button from './buttons/Button';
import Header from './global/Header';

const ManageAdmin = () => {
  document.title = 'Manage Admin - Marvin';
  return (
    <div id="ManageAdmin">
      <Header />
      <div className="page-content">
        <Button link="/">Admins number:</Button><br />
      </div>
    </div>
  );
};

export default ManageAdmin;

