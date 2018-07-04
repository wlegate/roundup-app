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
      next();
    }
  });
};

// TODO: move the cookies check here
const hasActiveSession = (req, res, next) => {
  console.log(req.cookies.session);
  if (req.cookies.session) {
    // check if session is still valid
    // if valid: next()
    // else: redirect to login
  } else {
    // redirect to login
  }
  next();
};

// TODO: add route to auto-delete sessions after x period of time

module.exports = { startSession, hasActiveSession };
