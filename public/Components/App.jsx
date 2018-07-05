import React, { Component } from 'react';
import Route from 'react-router-dom';
import Header from './Header.jsx';
import Main from './Main.jsx';
//conditional components
import Accounts from './loggedIn_landing/Accounts.jsx';
import Transactions from './loggedIn_landing/Transactions.jsx';
import Weekly from './loggedIn_landing/Weekly.jsx';
import axios from 'axios';
import PlaidClient from './../plaid-client';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'amaze',
      transactions: [],
      accounts: []
    };

    this.plaidLink = this.plaidLink.bind(this);

    updateInputValue: e => {
      this.setState({
        inputValue: e.target.value
      });
    };
  }

  handleLogin(email, password) {
    axios
      .post('/login', {
        email,
        password
      })
      .then()
      .catch();
  }

  handleRefreshTransactions = () => {
    axios
      .get('/transactions')
      .then(response => {
        if (response) this.setState({ transactions: response.data });
        else console.log('No transactions found.');
      })
      .catch(err => console.log(err));
  };

  plaidLink = () => {
    PlaidClient.open();
  };

  componentDidMount() {
    if (this.state.currentUser) {
      this.handleRefreshTransactions();

      axios
        .get('/accounts')
        .then(response => {
          if (response) this.setState({ accounts: response.data });
          else console.log('No accounts found.');
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    if (this.state.currentUser) {
      return (
        <div id="app-container">
          <Header currentUser={this.state.currentUser} />
          <Transactions
            refreshTransactions={this.handleRefreshTransactions}
            transactions={this.state.transactions}
          />
          <Accounts accounts={this.state.accounts} onLink={this.plaidLink} />
          <Weekly />
        </div>
      );
    } else {
      return (
        <div id="app-container">
          <Header currentUser={this.state.currentUser} />
          <Main inputValue={this.state.currentValue} />
        </div>
      );
    }
  }
}

export default App;
