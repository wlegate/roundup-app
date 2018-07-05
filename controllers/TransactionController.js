const client = require('./../dbclient');

// required to do precise math operations
const Decimal = require('decimal.js');

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
        const transAmountStr = transaction.amount.replace('$', '');
        const transAmountNum = Number(transAmountStr);
        const accNum =
          accumulator +
          (transAmountNum % 1 === 0 ? 0 : 1 - (transAmountNum % 1));

        console.log(`transaction: ${transaction}`);
        console.log(`transaction.amount: ${transaction.amount}`);
        console.log(`transAmountStr: ${transAmountStr}`);
        console.log(`transAmountNum: ${transAmountNum}`);
        console.log(`accNum: ${accNum}`);
        return accNum;
      }, 0);
      const dec = new Decimal(amount).toFixed(2);
      res.json({ amount: dec });
    }
  });
};

module.exports = { fetchTransactions, fetchRoundupAmount };
