import React, { Component } from 'react';
import Route from 'react-router-dom';
import Header from './Header.jsx';
import Main from './Main.jsx';
//conditional components 
import Accounts from './loggedIn_landing/Accounts.jsx';
import LoggedInHeader from './loggedIn_landing/Header.jsx';
import Transactions from './loggedIn_landing/Transactions.jsx';
import Weekly from './loggedIn_landing/Weekly.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "Wilbur",
      passValue: '',
      isLoggedIn: true
    }

    updateInputValue: (evt) => {
      this.setState({
        inputValue: evt.target.value
      });
    }
  }

  render() {
    if (this.state.isLoggedIn === true) {
      return (
        <div id="app-container">
          <LoggedInHeader></LoggedInHeader>
          <Transactions></Transactions>
          <Accounts></Accounts>
          <Weekly></Weekly>
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
