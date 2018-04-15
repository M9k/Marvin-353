import React from 'react';
import CardWithIcon from '../custom/CardWithIcon';

const Index = () => (
  <div>
    <CardWithIcon
      title="Login"
      text="Enter in the website using a confirmed account, for students, teachers and administrators"
      image="login.png"
      links={[{ path: 'login', label: 'Click here to login' }]}
    />
    <CardWithIcon
      title="Register"
      text="Request a new account, for both students and teachers"
      image="register.png"
      links={[{ path: 'request', label: 'Click here to request a new account' }]}
    />
  </div>
);
export default Index;
