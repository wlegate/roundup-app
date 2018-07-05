import React, { Component } from "react";
import moment from 'moment';

const Transaction = props => (
  <div className="transaction">
    <div>{props.transactionName}</div>
    <div>Date: {moment(props.transactionDate).format('MM-DD-YYYY')}</div>
    <div>Amount: {props.transactionAmount}</div>
  </div>
);

export default Transaction;
