import React from 'react';
import Route from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => (
  <div className="login-container">
    <h3>Please login below. </h3>
    <form>
      <input type="text" placeholder="email" />
      <input type="password" placeholder="password" />
      <button className="button" id="login-button">Login</button>
    </form>
    <Link to="/signup" className="btn" id="signup-btn">Sign Up</Link>
  </div>
);

export default Login;