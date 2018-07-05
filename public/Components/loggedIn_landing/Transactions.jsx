import React, { Component } from "react";
import Transaction from "./Transaction.jsx";

const Transactions = () => (
  <div className="transaction-container" class="column">
    <h3>Recent Transactions</h3>
    <button id="transaction-btn">Refresh Transactions</button>
    <Transaction
      transactionName={"Pizza"}
      transactionDate={"today"}
      transactionAmount={"15"}
    />
    <Transaction
      transactionName={"Burger"}
      transactionDate={"today"}
      transactionAmount={"10"}
    />
    <Transaction
      transactionName={"Car"}
      transactionDate={"today"}
      transactionAmount={"100"}
    />
  </div>
);

export default Transactions;
