import React from 'react';

const Login = props => (
  <div className="login-container">
    <form onSubmit={(e) => props.handleLogin(e)}>
      <input id="email" type="text" placeholder="email" />
      <input id="password" type="password" placeholder="password" />
      <button className="button" id="login-button">Login</button>
    </form>
  </div>
);

export default Login;
