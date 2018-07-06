import React, { Component } from 'react';
import Account from './Account.jsx';

class Accounts extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAccounts();
  }

  // TODO: add switch to toggle account on or off
  render() {
    const accounts = [];
    this.props.accounts.forEach(account => {
      accounts.push(
        <Account accountName={account.name} accountType={account.type} />
      );
    });
    return (
      <div className="column">
        <h3>Active Accounts</h3>
        <button id="link-btn" onClick={this.props.onLink}>
          Link Account
        </button>
        <br />
        <button id="link-btn" onClick={this.props.fetchTransactions}>
          Fetch Transactions
        </button>
        <br />
        {accounts}
      </div>
    );
  }
}

export default Accounts;
