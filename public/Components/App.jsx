import React, { Component } from "react";
import Route from "react-router-dom";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
//conditional components
import Accounts from "./loggedIn_landing/Accounts.jsx";
import Transactions from "./loggedIn_landing/Transactions.jsx";
import Weekly from "./loggedIn_landing/Weekly.jsx";
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "amaze@bowls.com",
      transactions: [],
      accounts: [],
    };

    updateInputValue: e => {
      this.setState({
        inputValue: e.target.value
      });
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
        console.log(`onSuccess:\n\npublic_token:\n${JSON.stringify(public_token, null, 2)}\n\nmetadata:\n${JSON.stringify(metadata, null, 2)}`);

        // Send the public_token to your app server.
        // The metadata object contains info about the institution the
        // user selected and the account ID, if the Account Select view
        // is enabled.
        $.post('/get_access_token', {
          public_token: public_token,
        });
      },
      onExit: (err, metadata) => {
        console.log(`onExit:\n\nerr:\n${JSON.stringify(err, null, 2)}\n\nmetadata:\n${JSON.stringify(metadata, null, 2)}`);
        // The user exited the Link flow.
        if (err != null) {
          // The user encountered a Plaid API error prior to exiting.
        }
        // metadata contains information about the institution
        // that the user selected and the most recent API request IDs.
        // Storing this information can be helpful for support.
      },
      onEvent: (eventName, metadata) => {
        console.log(`onEvent:\n\neventName:\n${JSON.stringify(eventName, null, 2)}\n\nmetadata:\n${JSON.stringify(metadata, null, 2)}`);
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

  handleLogin(email, password) {
    axios.post('/login', {
      email,
      password,
    }).then().catch();
  }

  componentDidMount() {
    if (this.state.currentUser) {
      axios.get('/transactions')
        .then((response) => {
          if (response) this.setState({ transactions: response.data });
          else console.log('No transactions found.');
        })
        .catch((err) => console.log(err));

      axios.get('/accounts')
        .then((response) => {
          if (response) this.setState({ accounts: response.data });
          else console.log('No accounts found.');
        }).catch((err) => console.log(err));
    }
  }

  render() {
    if (this.state.currentUser) {
      return (
        <div id="app-container">
          <Header currentUser={this.state.currentUser} />
          <Transactions transactions={this.state.transactions}/>
          <Accounts accounts={this.state.accounts} onLink={this.plaidLink}/>
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
