const client = require('./../dbclient');

const fetchTransactions = (req, res, next) => {
    let user_id = res.locals.user_id;
    // TODO: specify which columns to return
    // TODO: filter out transactions where is_pending = T
    let query = `SELECT * FROM "Transaction" WHERE user_id=${user_id}`;
    client.query(query, (err, response) => {
        if (err) console.log(err.stack)
        else {
            res.json(response.rows);
        }
    });
}

const createTransactions = (req, res, next) => {
    let transactions = res.locals.transactions;
    const created = [];
    let account_id;
    // TODO: refactor
    transactions.forEach((transaction) => {
        let plaid_account_id = transaction.account_id;
        let query = `SELECT _id FROM "Account" WHERE plaid_account_id='${plaid_account_id}'`;
        client.query(query, (err, response) => {
            if (err) {
                console.log('no account id found');
            } else {
                account_id = response.rows[0]._id;
                // console.log('account_id: ', account_id);
                let query2 = 'INSERT INTO "Transaction" (account_id, user_id, amount, categories, date, location, name, is_pending, type, plaid_transaction_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;';
                const values = [account_id, res.locals.user_id, transaction.amount, transaction.category, transaction.date, transaction.location, transaction.name, transaction.pending, transaction.transaction_type, transaction.transaction_id];
                client.query(query2, values, (err, response) => {
                    if (err) console.log(err.stack)
                    else {
                        created.push(response.rows[0]);
                    }
                });
            }
        });
    });
}

module.exports = { fetchTransactions, createTransactions };