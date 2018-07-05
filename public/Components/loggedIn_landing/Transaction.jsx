import React, { Component } from "react";

const Transaction = props => (
  <div class="transaction">
    <div>Name: {props.transactionName}</div>
    <div>Date: {props.transactionDate}</div>
    <div>Amount: ${props.transactionAmount}</div>
  </div>
);

export default Transaction;
