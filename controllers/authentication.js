const register = (req, res, next) => {};

const login = (req, res, next) => {};

const startSession = (req, res, next) => {};

const isAuthenticated = (req, res, next) => {
  if (req.cookies.session) {
    // check if session is still valid
    // if valid: next()
    // else: redirect to login
  } else {
    // redirect to login
  }
};

module.exports = { register, login, startSession, isAuthenticated };
