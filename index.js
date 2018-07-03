'use strict';

require('dotenv').config();

const envvar = require('envvar');
const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const moment = require('moment');
const plaid = require('plaid');

const APP_PORT = envvar.number('APP_PORT', 8000);
const PLAID_CLIENT_ID = envvar.string('PLAID_CLIENT_ID');
const PLAID_SECRET = envvar.string('PLAID_SECRET');
const PLAID_PUBLIC_KEY = envvar.string('PLAID_PUBLIC_KEY');
const PLAID_ENV = envvar.string('PLAID_ENV', 'sandbox');

// Initialize the Plaid client
const client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV]
);

console.log(`test app: ${app}`);
console.log(`test router: ${router}`);

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

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
router.post('/register', (req, res) => {});

/**
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
router.post('/login', (req, res) => {});

/**
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
router.get('/accounts', (req, res) => {});

/**
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
 *    is_pending: Boolean,
 *    type: String,
 *  }
 * ]
 *
 */
router.get('/transactions', (req, res) => {});

// ADMIN ROUTES
module.exports = { router };

const admin = require('./controllers/admin');
router.use('/admin', admin);

// LEGACY REFERENCE

router.get('/', function(request, response, next) {
  response.render('index.ejs', {
    PLAID_PUBLIC_KEY: PLAID_PUBLIC_KEY,
    PLAID_ENV: PLAID_ENV
  });
});

router.post('/get_access_token', function(request, response, next) {
  PUBLIC_TOKEN = request.body.public_token;
  client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
    if (error != null) {
      var msg = 'Could not exchange public_token!';
      console.log(msg + '\n' + JSON.stringify(error));
      return response.json({
        error: msg
      });
    }
    ACCESS_TOKEN = tokenResponse.access_token;
    ITEM_ID = tokenResponse.item_id;
    console.log('Access Token: ' + ACCESS_TOKEN);
    console.log('Item ID: ' + ITEM_ID);
    response.json({
      error: false
    });
  });
});

router.get('/accounts', function(request, response, next) {
  // Retrieve high-level account information and account and routing numbers
  // for each account associated with the Item.
  client.getAuth(ACCESS_TOKEN, function(error, authResponse) {
    if (error != null) {
      var msg = 'Unable to pull accounts from the Plaid API.';
      console.log(msg + '\n' + JSON.stringify(error));
      return response.json({
        error: msg
      });
    }

    console.log(authResponse.accounts);
    response.json({
      error: false,
      accounts: authResponse.accounts,
      numbers: authResponse.numbers
    });
  });
});

router.post('/item', function(request, response, next) {
  // Pull the Item - this includes information about available products,
  // billed products, webhook information, and more.
  client.getItem(ACCESS_TOKEN, function(error, itemResponse) {
    if (error != null) {
      console.log(JSON.stringify(error));
      return response.json({
        error: error
      });
    }

    // Also pull information about the institution
    client.getInstitutionById(itemResponse.item.institution_id, function(
      err,
      instRes
    ) {
      if (err != null) {
        var msg = 'Unable to pull institution information from the Plaid API.';
        console.log(msg + '\n' + JSON.stringify(error));
        return response.json({
          error: msg
        });
      } else {
        response.json({
          item: itemResponse.item,
          institution: instRes.institution
        });
      }
    });
  });
});

router.post('/transactions', function(request, response, next) {
  // Pull transactions for the Item for the last 30 days
  var startDate = moment()
    .subtract(30, 'days')
    .format('YYYY-MM-DD');
  var endDate = moment().format('YYYY-MM-DD');
  client.getTransactions(
    ACCESS_TOKEN,
    startDate,
    endDate,
    {
      count: 250,
      offset: 0
    },
    function(error, transactionsResponse) {
      if (error != null) {
        console.log(JSON.stringify(error));
        return response.json({
          error: error
        });
      }
      console.log(
        'pulled ' + transactionsResponse.transactions.length + ' transactions'
      );
      response.json(transactionsResponse);
    }
  );
});

var server = app.listen(APP_PORT, function() {
  console.log('plaid-walkthrough server listening on port ' + APP_PORT);
});
