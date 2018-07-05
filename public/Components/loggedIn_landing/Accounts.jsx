import React, { Component } from "react";
import Account from "./Account.jsx";

const Accounts = props => {
  const accounts = [];
  props.accounts.forEach(account => {
    accounts.push(
      <Account
        accountName={account.name}
        accountType={account.type}
      />
    );
  });
  return (
    <div className="account-container" class="column">
      <h3>Active Accounts</h3>
      <button id="link-btn" onClick={props.onLink}>Link Account</button>
      {accounts}
    </div>
  );
};

export default Accounts;
