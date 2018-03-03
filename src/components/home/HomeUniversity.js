import React from 'react';
import { Button } from 'react-bootstrap';

const HomeUniversity = () => (
  <div className="page-home">
    <h1>Welcome founder!</h1>
    <div className="page-content">
      <Button href="manageadmin">Manage admins</Button><br />
      <Button href="/" disabled>Manage academic years</Button><br />
    </div>
  </div>
);


export default HomeUniversity;
