import React from 'react';
import Logging from './load/logging';
import Header from './global/Header';

const Login = () => {
  document.title = 'Marvin - Login';
  return (
    <div className="login">
      <Header />
      <h4>Login!</h4>
      <Logging />
    </div>
  );
};

export default Login;
