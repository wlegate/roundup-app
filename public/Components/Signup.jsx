import React from 'react';

const Signup = (props) => (
  <div id="signup">
    <form onSubmit={(e) => props.handleSignup(e)}>
      <input type="text" id="signupemail" placeholder="email" />
      <input type="password" id="signuppassword" placeholder="password" />
      <button className="button" id="signup-button">
        Sign Up
      </button>
    </form>
  </div>
);

export default Signup;
