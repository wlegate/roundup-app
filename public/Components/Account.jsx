import React, { Component } from 'react';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
    };
  }

  handleCheck = () => {
    this.setState({ checked: !this.state.checked });
  }

  render() {
    return (
      <div className="account">
        <div>{this.props.accountName}</div>
        <div>{this.props.accountType}</div>
        <input type="checkbox" checked={this.state.checked} onChange={this.handleCheck}/>
      </div>
    );
  }
}

export default Account;
