import React from 'react';
import Logging from './load/logging';

const Login = () => {
  document.title = 'Marvin - Login';
  return (
    <div className="login">
      <h4>Login!</h4>
      <Logging />
    </div>
  );
};

export default Login;
