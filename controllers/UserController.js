const client = require('./../dbclient');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const createUser = (req, res, next) => {
    let { email, password } = req.body;
    password = bcrypt.hashSync(password, SALT_WORK_FACTOR);
    const query = 'INSERT INTO "User" (email, password) VALUES ($1, $2) RETURNING *;';
    let values = [email, password];
    client.query(query, values, (err, response) => {
        if (err) {
            console.log(err.stack)
        } else {
            const user = response.rows[0];
            res.locals.user = user;
            next();
        }
    });
};

const authenticateUser = (req, res, next) => {
    console.log('authenticateUser');
    let { email, password } = req.body;
    const query = `SELECT * FROM "User" WHERE email='${email}'`;
    client.query(query, (err, response) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(response);
            const user = response.rows[0];
            res.locals.user = user;
            let result = bcrypt.compareSync(password, user.password);
            if (result) {
                next();
            } else {
                // TODO: make better
                res.end('Password is invalid');
            }

        }
    })
};

module.exports = { createUser, authenticateUser };
