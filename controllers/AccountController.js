const client = require('./../dbclient');

const fetchAccounts = (req, res, next) => {
    let user_id = res.locals.user_id;
    // TODO: specify which columns to return
    const query = `SELECT * FROM "Account" WHERE user_id=${user_id}`;
    client.query(query, (err, response) => {
        if (err) console.log(err.stack)
        else {
            res.json(response.rows);
        }
    });
}

const createAccounts = (req, res, next) => {
    let accounts = res.locals.accounts;
    const created = [];
    accounts.forEach((account) => {
        const query = 'INSERT INTO "Account" (user_id, plaid_item_id, name, official_name, type, subtype, plaid_access_token, plaid_account_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;';
        const values = [res.locals.user_id, res.locals.item_id, account.name, account.official_name, account.type, account.subtype, res.locals.access_token, account.account_id];
        client.query(query, values, (err, response) => {
            if (err) console.log(err.stack)
            else {
                created.push(response.rows[0]);
            }
        });
    });
    next();
}

module.exports = { fetchAccounts, createAccounts };