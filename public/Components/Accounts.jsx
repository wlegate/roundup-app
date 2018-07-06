import React, { Component } from 'react';
import Account from './Account.jsx';
import Weekly from './Weekly.jsx';

class Accounts extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAccounts();
    console.log('in accounts.jsx, contribution: ', this.props.contribution);
    this.props.getContributions();
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
        <button id="logout-btn" onClick={this.props.logout}>
          Logout
        </button>
        {accounts}
        <Weekly contributions={this.props.contributions}/>
      </div>
    );
  }
}

export default Accounts;
