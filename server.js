'use strict';

// enables access environment variables contained within the .env file
require('dotenv').config();

// EXTERNAL DEPENDENCIES
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const plaid = require('plaid');

// CONTROLLERS
const AccountController = require('./controllers/AccountController');
const ChargeController = require('./controllers/ChargeController');
const ItemController = require('./controllers/ItemController');
const SessionController = require('./controllers/SessionController');
const TransactionController = require('./controllers/TransactionController');
const UserController = require('./controllers/UserController');

// ROUTES
const admin = require('./routes/admin');

// CONSTANTS
const { APP_NAME, PLAID } = require('./config');
const APP_PORT = process.env.PORT || 8080;
const PLAID_ENV = process.env.PLAID_ENV ? process.env.PLAID_ENV : 'sandbox';

// Initialize the Plaid client
const client = new plaid.Client(
  PLAID.CLIENT_ID,
  PLAID.SECRET,
  PLAID.PUBLIC_KEY,
  plaid.environments[PLAID_ENV]
);

module.exports = { app, client };

// EXPRESS - CONFIG

app.use(express.static('build'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cookieParser());

// app.set('view engine', 'ejs'); // TODO: Do we still need this?

app.set('port', APP_PORT);

// EXPRESS - ROUTES

app.get('/', (req, res) => {
  res.render('index.ejs', { APP_NAME });
});

/**
 * Creates db User and Session
 *
 * Request Body:
 * {
 *  email: String,
 *  password: String
 * }
 *
 * Response Body:
 * {
 *  session: String or Null,
 *  error: String or Null
 * }
 *
 */
app.post(
  '/register',
  UserController.createUser,
  SessionController.startSession,
  (req, res) => {
    res.redirect('/');
  }
);

/**
 * POST /login
 *
 * Validates login credentials and creates db Session
 *
 * Request Body:
 * {
 *  email: String,
 *  password: String
 * }
 *
 * Response Body:
 * {
 *  session: String or Null,
 *  error: String or Null
 * }
 *
 */
app.post(
  '/login',
  UserController.authenticateUser,
  SessionController.startSession,
  (req, res) => {
    res.json({ success: true });
  }
);

/**
 * GET /accounts
 *
 * Returns a JSON list of their connected accounts
 *
 * Response Body:
 * [
 *  {
 *    id: Number
 *    iso_currency_code: String,
 *    name: String,
 *    official_name: String,
 *    type: String,
 *    substype: String,
 *  }, …
 * ]
 *
 */
app.get(
  '/accounts',
  SessionController.hasActiveSession,
  AccountController.fetchAccounts,
  (req, res) => {
    res.send('Accounts go here…');
  }
);

/**
 * GET /transactions
 *
 * Params: page (page number, 0-indexed, default = 0), count (per page, default = 20)
 *
 * Response Body:
 * [
 *  {
 *    id: Number,
 *    iso_currency_code: String,
 *    account_id: Number,
 *    amount: Number,
 *    categories: Array,
 *    date: Date,
 *    location: {
 *      address: String,
 *      city: String,
 *      state: String,
 *      zip_code: String,
 *      coordinates: {
 *        lat: Number,
 *        lon: Number
 *      }
 *    },
 *    name: String,
 *    type: String,
 *  }
 * ]
 *
 */
app.get(
  '/transactions',
  SessionController.hasActiveSession,
  TransactionController.fetchTransactions,
  (req, res) => {
    res.send('Transactions go here…');
  }
);

app.get('/cookie', SessionController.hasActiveSession, (req, res) => {
  res.json({ success: true });
});

// TESTING
app.get(
  '/pending',
  SessionController.hasActiveSession,
  TransactionController.fetchRoundupAmount
);

// setup /admin/* routes
app.use('/admin', admin);

// start server
app.listen(APP_PORT, function() {
  console.log(`Running '${APP_NAME}' on port ${APP_PORT}`);
});
