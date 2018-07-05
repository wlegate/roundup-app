import React, { Component } from 'react';

import Header from './Header.jsx';
import Accounts from './Accounts.jsx';
import Transactions from './Transactions.jsx';
import Weekly from './Weekly.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import plaidClientHandler from './../plaid-client-handler';

import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO: persistent authentication
      currentUser: 'Amaze',
      transactions: [],
      accounts: []
    };
  }

  plaidLink() {
    /**
     * we can't pass in plaidClientHandler.open directly as props because
     * React adds params which break Plaid from functioning properly…
     * 
     * There may be a better way to do this though?
     */
    plaidClientHandler.open();
  }

  handleLogin = e => {
    e.preventDefault();
    axios
      .post('/login', {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
      })
      .then(response => {
        if (response.data.session) this.setState({ currentUser: true });
        else console.log('Unable to login.');
      })
      .catch(err => console.log(err));
  };

  handleRefreshTransactions = () => {
    axios
      .get('/transactions')
      .then(response => {
        if (response.data) this.setState({ transactions: response.data });
        else console.log('No transactions found.');
      })
      .catch(err => console.log(err));
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
          <div id="user-landing">
            <Transactions
              refreshTransactions={this.handleRefreshTransactions}
              transactions={this.state.transactions}
            />
            <Accounts accounts={this.state.accounts} onLink={this.plaidLink} />
            {/* <Weekly /> */}
          </div>
        </div>
      );
    } else {
      return (
        <div id="app-container">
          <Header currentUser={this.state.currentUser} />
          <h3>Please Login or Sign Up below.</h3>
          <Login handleLogin={this.handleLogin} />
          <br />
          <Signup />
        </div>
      );
    }
  }
}

export default App;
