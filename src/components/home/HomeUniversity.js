import React from 'react';
import Button from '../buttons/Button';

const HomeUniversity = () => (
  <div className="page-home">
    <h1>Welcome founder!</h1>
    <div className="page-content">
      <Button link="/">Manage admins</Button><br />
      <Button link="/">Manage academic years</Button><br />
    </div>
  </div>
);


export default HomeUniversity;
