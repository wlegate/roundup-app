import React, { Component } from 'react';
import Transaction from './Transaction.jsx';

const Transactions = props => {
  const transactions = [];
  props.transactions.forEach(transaction => {
    transactions.push(
      <Transaction
        transactionName={transaction.name}
        transactionDate={transaction.date}
        transactionAmount={transaction.amount}
      />
    );
  });
  return (
    <div className="transaction-container">
      <h3>Recent Transactions</h3>
      {transactions}
    </div>
  );
};

export default Transactions;
