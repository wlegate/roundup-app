import React from 'react';

const Signup = () => (
  <div id="signup">
    <form>
      <input type="text" placeholder="email" />
      <input type="password" placeholder="password" />
      <button className="button" id="signup-button"> sign up </button>
    </form>
  </div>
);

export default Signup