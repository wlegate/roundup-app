const client = require('./../dbclient');
const uuid = require('uuid/v1');

const startSession = (req, res, next) => {
  const user = res.locals.user;
  const query = 'INSERT INTO "Session" (user_id, session) VALUES ($1, $2) RETURNING *;';
  let values = [user._id, uuid()];
  client.query(query, values, (err, response) => {
    if (err) {
      console.log(err.stack)
    } else {
      const { _id, session } = response.rows[0];
      const obj = { id: _id, session };
      res.cookie('session', session);
      return res.send({ session });
    }
  });
};

const hasActiveSession = (req, res, next) => {
  const session = req.cookies.session;
  console.log('hasActiveSession: ', session);
  if (session) {
    const query = `SELECT user_id FROM "Session" WHERE session='${session}'`;
    client.query(query, (err, response) => {
      if (err) {
        res.redirect('/');
      } else {
        if (response.rows[0]) {
          let { user_id } = response.rows[0];
          res.locals.user_id = user_id;
          console.log('res.locals.user_id = ', res.locals.user_id);
          next();
        }
      }
    });
  } else {
    res.redirect('/');
  }
};

// TODO: add route to auto-delete sessions after x period of time

module.exports = { startSession, hasActiveSession };
