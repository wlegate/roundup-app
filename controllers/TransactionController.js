const client = require('./../dbclient');

const fetchTransactions = (req, res, next) => {
    let user_id = res.locals.user_id;
    // TODO: specify which columns to return
    // TODO: filter out transactions where is_pending = T
    const query = `SELECT * FROM "Transaction" WHERE user_id=${user_id}`;
    client.query(query, (err, response) => {
        if (err) console.log(err.stack)
        else {
            res.send(response.rows);
        }
    });
}

const createTransactions = (req, res, next) => {
    // Request body is an array of objects, the response.transactions from plaid
    let transactions = JSON.parse(req.body.transactions);
    console.log('createTransactions: ', Array.isArray(transactions));
    transactions.forEach((transaction) => {
        const query = `INSERT INTO "Transaction" (iso_currency_code, account_id, user_id, amount, categories, date, location, name, is_pending, charge_id, type, plaid_pending_transaction_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 9, $10, $11, $12) RETURNING *`;
        let values = [transaction.iso_currency_code, transaction.account_id, 4, transaction.amount, transaction.categories, transaction.date, transaction.location, transaction.name, transaction.is_pending, null, transaction.type, null];
        client.query(query, values, (err, response) => {
            if (err) console.log(err.stack)
            else {
                console.log(response);
                next();
                // res.send(response.rows);
            }
        });
    });
}

module.exports = { fetchTransactions, createTransactions };