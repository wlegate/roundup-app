const client = require('./../dbclient');

// required to do precise math operations
import { Decimal } from 'decimal.js';

const fetchTransactions = (req, res, next) => {
  const user_id = res.locals.user_id;
  // TODO: specify which columns to return
  // TODO: filter out transactions where is_pending = T
  const query = `SELECT * FROM "Transaction" WHERE user_id=${user_id}`;
  client.query(query, (err, response) => {
    if (err) console.log(err.stack);
    else {
      res.send(response.rows);
    }
  });
};

const fetchRoundupAmount = (req, res) => {
  const user_id = res.locals.user_id;
  const query = `SELECT * FROM "Transaction" WHERE user_id=${user_id}`;
  client.query(query, (err, response) => {
    if (err) res.send(err);
    else {
      const amount = response.rows.reduce((accumulator, transaction) => {
        const amount = Number(transaction.amount.replace('$', ''));
        console.log(`transaction: ${transaction}`);
        console.log(`transaction.amount: ${transaction.amount}`);
        console.log(`amount: ${amount}`);
        return new Decimal(
          accumulator + (amount % 1 === 0 ? 0 : 1 - (amount % 1))
        ).toFixed(2);
      }, 0);
      res.json({ amount });
    }
  });
};

module.exports = { fetchTransactions, fetchRoundupAmount };
