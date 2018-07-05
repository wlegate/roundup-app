import React, { Component } from "react";

const Account = props => (
  <div className="account">
    <div>{props.accountName}</div>
    <div>{props.accountType}</div>
  </div>
);

export default Account;
