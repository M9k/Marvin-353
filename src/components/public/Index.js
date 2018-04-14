import React from 'react';
import CardWithIcon from '../custom/CardWithIcon';

const Index = () => (
  <div>
    <CardWithIcon
      title="Login"
      text="Enter in the website"
      links={[{ path: 'login', label: 'Click here to login' }]}
    />
    <CardWithIcon
      title="Request an account"
      text="Register a new account in case you already doesn't have one"
      links={[{ path: 'request', label: 'Click here to request a new account' }]}
    />
  </div>
);
export default Index;
