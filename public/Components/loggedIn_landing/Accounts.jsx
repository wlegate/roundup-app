import React, { Component } from "react";

const Accounts = (props) => (
  <div className="account-container" class="column">
    <h3>Active Accounts</h3>
    <button id="link-btn" onClick={props.onLink}>Link Account</button>
    <div id="account">Wells Fargo Checking</div>
    <div id="account">American Express Credit</div>
  </div>
);

export default Accounts;
