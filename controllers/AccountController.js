const client = require('./../dbclient');

const fetchAccounts = (req, res, next) => {
    // TODO: make this a join
    const session = req.cookies.session;
    const query = `SELECT user_id FROM "Session" WHERE session='${session}'`;
    client.query(query, (err, response) => {
        if (err) {
            console.log(err.stack)
        } else {
            let { user_id } = response.rows[0];
            // TODO: specify which columns to return
            const query = `SELECT * FROM "Account" WHERE user_id=${user_id}`;
            client.query(query, (err, response) => {
                if (err) console.log(err.stack)
                else {
                    res.send(response.rows);
                }
            });
        }
    });
}

module.exports = { fetchAccounts };