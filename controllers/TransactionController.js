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

module.exports = { fetchTransactions };