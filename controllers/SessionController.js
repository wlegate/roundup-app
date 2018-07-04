const startSession = (req, res, next) => {};

const isAuthenticated = (req, res, next) => {
  if (req.cookies.session) {
    // check if session is still valid
    // if valid: next()
    // else: redirect to login
  } else {
    // redirect to login
  }
  next();
};

module.exports = { startSession, isAuthenticated };
