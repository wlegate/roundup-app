const client = require('./../dbclient');

const fetchAccounts = (req, res, next) => {
    let user_id = res.locals.user_id;
    console.log('fetchAccounts: ', user_id);
    // TODO: specify which columns to return
    const query = `SELECT * FROM "Account" WHERE user_id=${user_id}`;
    client.query(query, (err, response) => {
        if (err) console.log(err.stack)
        else {
            res.send(response.rows);
        }
    });
}

module.exports = { fetchAccounts };