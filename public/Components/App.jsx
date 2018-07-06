import React, { Component } from 'react';

import Header from './Header.jsx';
import Accounts from './Accounts.jsx';
import Transactions from './Transactions.jsx';
import Weekly from './Weekly.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';

import { ROUTES } from './../../config';

/**
 * The Plaid Link client-side client
 * WARNING: This is different than the Plaid server-side client
 */
import plaidClientHandler from './../plaid-client-handler';

// axios is a promise based HTTP client for the browser and node.js
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: false,
      transactions: [],
      accounts: [],
      totalContribution: 0
    };
    this.fetchTransactions = this.fetchTransactions.bind(this);
  }

  plaidLink = () => {
    console.log('plaidLink()');

    const handler = Plaid.create({
      // TODO: Update from client name from constants file
      clientName: 'Plaid Demo',
      // TODO: Update based on ENV variable
      env: 'sandbox',
      // TODO: Use value from constants file or ENV variable instead of hardcoded key
      key: 'fc0c3b87ad657003cfedb41be91409',
      // TODO: Is this the only product we need?
      product: ['transactions'],
      // Webhook for transaction and error updates…
      // TODO: Set to correct endpoint
      webhook: 'https://legate-request-bin.herokuapp.com/1agjr801',
      onLoad: () => {
        console.log(`onLoad…`);
        // Optional, called when Link loads
      },
      onSuccess: (public_token, metadata) => {
        console.log(
          `onSuccess:\n\npublic_token:\n${JSON.stringify(
            public_token,
            null,
            2
          )}`
        );

        // Send the public_token to your app server.
        // The metadata object contains info about the institution the
        // user selected and the account ID, if the Account Select view
        // is enabled.
        $.post('/admin/get_access_token', {
          public_token: public_token
        }).then(() => this.getAccounts()).catch(err => console.log(err));
      },
      onExit: (err, metadata) => {
        console.log(`onExit:\n\nerr:\n${JSON.stringify(err, null, 2)}`);
        // The user exited the Link flow.
        if (err != null) {
          // The user encountered a Plaid API error prior to exiting.
        }
        // metadata contains information about the institution
        // that the user selected and the most recent API request IDs.
        // Storing this information can be helpful for support.
      },
      onEvent: (eventName, metadata) => {
        console.log(
          `onEvent:\n\neventName:\n${JSON.stringify(eventName, null, 2)}`
        );
        // Optionally capture Link flow events, streamed through
        // this callback as your users connect an Item to Plaid.
        // For example:
        // eventName = "TRANSITION_VIEW"
        // metadata  = {
        //   link_session_id: "123-abc",
        //   mfa_type:        "questions",
        //   timestamp:       "2017-09-14T14:42:19.350Z",
        //   view_name:       "MFA",
        // }
      }
    });

    handler.open();
  };

  handleLogin = e => {
    e.preventDefault();
    axios
      .post(ROUTES.CLIENT.LOGIN, {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
      })
      .then(response => {
        if (response.data.session) this.setState({ currentUser: true });
        else console.log('Unable to login.');
      })
      .catch(err => console.log(err));
  };

  handleLogout = e => {
    e.preventDefault();
    this.setState({ currentUser: false });
  }

  handleSignup = e => {
    e.preventDefault();
    console.log('handleSignup');
    axios
      .post(ROUTES.CLIENT.SIGNUP, {
        email: document.getElementById('signupemail').value,
        password: document.getElementById('signuppassword').value
      })
      .then(response => {
        if (response.data.session) this.setState({ currentUser: true });
        else console.log('Unable to register.');
      })
      .catch(err => console.log(err));
  };

  handleRefreshTransactions = () => {
    axios
      .get(ROUTES.CLIENT.TRANSACTIONS)
      .then(response => {
        if (response.data) this.setState({ transactions: response.data });
        else console.log('No transactions found.');
      })
      .catch(err => console.log(err));
  };

  fetchTransactions = () => {
    axios
      .post('/admin/transactions')
      .then(() => this.getTransactions())
      .catch(err => console.log(err));
  };

  getTransactions = () => {
    axios
      .get('/transactions')
      .then(response => {
        if (response) this.setState({ transactions: response.data });
        else console.log('No transactions found.');
      })
      .catch(err => console.log(err));
  };

  getAccounts = () => {
    axios
      .get('/accounts')
      .then(response => {
        if (response) this.setState({ accounts: response.data });
        else console.log('No accounts found.');
      })
      .catch(err => console.log(err));
  };

  getContributions = () => {
    axios
      .get('/pending')
      .then(response => {
        if (response) {
          console.log('getContributions function response: ', response.data.amount);
          this.setState({ totalContribution: response.data.amount })
        }
        else console.log('something went wrong');
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    if (!this.state.currentUser) {
      axios
        .get('/cookie')
        .then(response => {
        if (response.data.success) this.setState({ currentUser: true });
        })
        .catch(err => console.log(err));
    }
  }

  // TODO: add this weeks total contribution display
  render() {
    if (this.state.currentUser) {
      return (
        <div id="app-container">
          <Header currentUser={this.state.currentUser} />
          <div id="user-landing fadein">
            <Transactions
              refreshTransactions={this.handleRefreshTransactions}
              transactions={this.state.transactions}
            />
            <Accounts
              getAccounts={this.getAccounts}
              logout={this.handleLogout}
              accounts={this.state.accounts}
              onLink={this.plaidLink}
              fetchTransactions={this.fetchTransactions}
              getContributions={this.getContributions}
              contributions={this.state.totalContribution}
            />
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
          <Signup handleSignup={this.handleSignup} />
        </div>
      );
    }
  }
}

export default App;
