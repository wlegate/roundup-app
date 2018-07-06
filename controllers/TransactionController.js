const client = require('./../dbclient');

// required to do precise math operations
const Decimal = require('decimal.js');

const fetchTransactions = (req, res, next) => {
  let user_id = res.locals.user_id;
  // TODO: specify which columns to return
  // TODO: filter out transactions where is_pending = T
  let query = `SELECT * FROM "Transaction" WHERE user_id=${user_id}`;
  client.query(query, (err, response) => {
    if (err) console.log(err.stack);
    else {
      res.json(response.rows);
    }
  });
};

const createTransactions = (req, res, next) => {
  let transactions = res.locals.transactions;
  const created = [];
  let account_id;
  // TODO: refactor
  transactions.forEach(transaction => {
    const plaid_account_id = transaction.account_id;
    const query = `SELECT _id FROM "Account" WHERE plaid_account_id='${plaid_account_id}'`;
    client.query(query, (err, response) => {
      if (err) {
        console.log('no account id found');
      } else {
        account_id = response.rows[0]._id;
        // console.log('account_id: ', account_id);
        const query2 =
          'INSERT INTO "Transaction" (account_id, user_id, amount, categories, date, location, name, is_pending, type, plaid_transaction_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;';
        const values = [
          account_id,
          res.locals.user_id,
          transaction.amount,
          transaction.category,
          transaction.date,
          transaction.location,
          transaction.name,
          transaction.pending,
          transaction.transaction_type,
          transaction.transaction_id
        ];
        client.query(query2, values, (err, response) => {
          if (err) console.log(err.stack);
          else {
            created.push(response.rows[0]);
          }
        });
      }
    });
  });
  next();
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
        const transNum = Number(
          transaction.amount.replace('$', '').replace(',', '')
        ); // convert '$x.x' String to x.x Number
        const shouldRoundEvenAmount = false; // if true, even dollar amounts are rounded up $1.00… they don't round otherwise
        const isEven = transNum % 1 === 0; // if even dollar amount (i.e. $1.00 = true, $1.02 = false because it has a remainder of 0.02)
        const isDeposit = transNum < 0; // ignore transactions representing money moving into the account
        const accNum =
          accumulator +
          ((!shouldRoundEvenAmount && isEven) || isDeposit
            ? 0
            : roundedVal(transNum));

        return accNum;
      }, 0);

      const dec = new Decimal(amount).toFixed(2);
      res.json({ amount: dec });
    }
  });
};

module.exports = { fetchTransactions, createTransactions, fetchRoundupAmount };
