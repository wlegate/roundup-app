import React, { Component } from 'react';
import Transaction from './Transaction.jsx';

class Transactions extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.refreshTransactions();
  }

  render() {
    const transactions = [];
    this.props.transactions.forEach(transaction => {
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
  }
}

export default Transactions;
