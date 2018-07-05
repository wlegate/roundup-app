import React, { Component } from "react";
import Route from "react-router-dom";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
//conditional components
import Accounts from "./loggedIn_landing/Accounts.jsx";
import Transactions from "./loggedIn_landing/Transactions.jsx";
import Weekly from "./loggedIn_landing/Weekly.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "Wilbur",
      // placeholder transactions, clear the array below when ready
      transactions: [{ name: 'Pizza', date: '1/1/1991', amount: '15'}, {}],
    };

    updateInputValue: e => {
      this.setState({
        inputValue: e.target.value
      });
    };
  }

  render() {
    if (this.state.currentUser) {
      return (
        <div id="app-container">
          <Header currentUser={this.state.currentUser} />
          <Transactions transactions={this.state.transactions}/>
          <Accounts />
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
