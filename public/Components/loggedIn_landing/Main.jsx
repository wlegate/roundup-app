import React, { Component } from "react";
import Header from "./Header.jsx";
import Transactions from "./Transactions.jsx";
import Weekly from "./Weekly.jsx";
import Accounts from "./Accounts.jsx";

class App extends Component {
  render() {
    return (
      <div id="app-container">
        <Header />
        <Transactions />
        <Accounts />
        <Weekly />
      </div>
    );
  }
}
