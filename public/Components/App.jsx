import React, { Component } from "react";

import Header from "./Header.jsx";
import Accounts from "./Accounts.jsx";
import Transactions from "./Transactions.jsx";
import Weekly from "./Weekly.jsx";
import Signup from './Signup.jsx';
import Login from './Login.jsx';
// import PlaidClient from './../plaid-client';

import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO: persistent authentication
      currentUser: "Amaze",
      transactions: [],
      accounts: []
    };
  }

  plaidLink() {
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
        console.log(`onSuccess:\n\npublic_token:\n${JSON.stringify(public_token, null, 2)}`);

        // Send the public_token to your app server.
        // The metadata object contains info about the institution the
        // user selected and the account ID, if the Account Select view
        // is enabled.
        $.post('/admin/get_access_token', {
          public_token: public_token,
        });
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
        console.log(`onEvent:\n\neventName:\n${JSON.stringify(eventName, null, 2)}`);
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
  }

  handleLogin = (e) => {
    e.preventDefault();
    axios.post('/login', {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    }).then((response) => {
      if (response.data.session) this.setState({ currentUser: true });
      else console.log('Unable to login.');
    }).catch((err) => console.log(err));
  }

  handleRefreshTransactions = () => {
    axios.get('/transactions')
      .then((response) => {
        if (response.data) this.setState({ transactions: response.data });
        else console.log('No transactions found.');
      })
      .catch((err) => console.log(err));
  }

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
            <Transactions refreshTransactions={this.handleRefreshTransactions} transactions={this.state.transactions} />
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
