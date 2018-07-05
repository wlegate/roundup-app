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

  const roundedVal = num => {
    // TODO: Use Decimal library for precise math here
    return 1 - (num % 1);
  };

  const query = `SELECT * FROM "Transaction" WHERE user_id=${user_id}`;
  client.query(query, (err, response) => {
    if (err) res.send(err);
    else {
      const amount = response.rows.reduce((accumulator, transaction) => {
        const transNum = Number(transaction.amount.replace('$', '')); // convert '$x.x' String to x.x Number
        const shouldRoundEvenAmount = false; // if true, even dollar amounts are rounded up $1.00… they don't round otherwise
        const isEven = transNum % 1 === 0; // if even dollar amount (i.e. $1.00 = true, $1.02 = false because it has a remainder of 0.02)
        const accNum =
          accumulator +
          (!shouldRoundEvenAmount && isEven ? 0 : roundedVal(transNum));

        console.log(`transNum: ${transNum}`);
        console.log(`isEven: ${isEven}`);
        console.log(`accNum: ${accNum}`);
        return accNum;
      }, 0);
      console.log(`amount: ${amount}`);
      const dec = new Decimal(amount).toFixed(2);
      res.json({ amount: dec });
    }
  });
};

module.exports = { fetchTransactions, fetchRoundupAmount };
