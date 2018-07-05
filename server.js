'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const plaid = require('plaid');
const path = require('path');

// Controllers
const AccountController = require('./controllers/AccountController');
const ChargeController = require('./controllers/ChargeController');
const ItemController = require('./controllers/ItemController');
const SessionController = require('./controllers/SessionController');
const TransactionController = require('./controllers/TransactionController');
const UserController = require('./controllers/UserController');

const APP_PORT = process.env.PORT || 8080;

module.exports = app;

app.use(express.static('build'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('port', APP_PORT);

app.get('/', UserController.authenticateUser, (req, res) => {
  res.sendFile(path.join(__dirname, '/build/', '/index.html'));
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

// ADMIN ROUTES

const admin = require('./routes/admin');
app.use('/admin', admin);

// app.get('*', function(request, response) {
//   response.sendFile(path.resolve(__dirname, './build', 'index.html'));
// });

// LEGACY REFERENCE

// app.get('/', function(request, response, next) {
//   response.render('index.ejs', {
//     PLAID_PUBLIC_KEY: PLAID_PUBLIC_KEY,
//     PLAID_ENV: PLAID_ENV
//   });
// });

// app.post('/get_access_token', function(request, response, next) {
//   PUBLIC_TOKEN = request.body.public_token;
//   client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
//     if (error != null) {
//       var msg = 'Could not exchange public_token!';
//       console.log(msg + '\n' + JSON.stringify(error));
//       return response.json({
//         error: msg
//       });
//     }
//     ACCESS_TOKEN = tokenResponse.access_token;
//     ITEM_ID = tokenResponse.item_id;
//     console.log('Access Token: ' + ACCESS_TOKEN);
//     console.log('Item ID: ' + ITEM_ID);
//     response.json({
//       error: false
//     });
//   });
// });

// app.get('/accounts', function(request, response, next) {
//   // Retrieve high-level account information and account and routing numbers
//   // for each account associated with the Item.
//   client.getAuth(ACCESS_TOKEN, function(error, authResponse) {
//     if (error != null) {
//       var msg = 'Unable to pull accounts from the Plaid API.';
//       console.log(msg + '\n' + JSON.stringify(error));
//       return response.json({
//         error: msg
//       });
//     }

//     console.log(authResponse.accounts);
//     response.json({
//       error: false,
//       accounts: authResponse.accounts,
//       numbers: authResponse.numbers
//     });
//   });
// });

// app.post('/item', function(request, response, next) {
//   // Pull the Item - this includes information about available products,
//   // billed products, webhook information, and more.
//   client.getItem(ACCESS_TOKEN, function(error, itemResponse) {
//     if (error != null) {
//       console.log(JSON.stringify(error));
//       return response.json({
//         error: error
//       });
//     }

//     // Also pull information about the institution
//     client.getInstitutionById(itemResponse.item.institution_id, function(
//       err,
//       instRes
//     ) {
//       if (err != null) {
//         var msg = 'Unable to pull institution information from the Plaid API.';
//         console.log(msg + '\n' + JSON.stringify(error));
//         return response.json({
//           error: msg
//         });
//       } else {
//         response.json({
//           item: itemResponse.item,
//           institution: instRes.institution
//         });
//       }
//     });
//   });
// });

// app.post('/transactions', function(request, response, next) {
//   // Pull transactions for the Item for the last 30 days
//   var startDate = moment()
//     .subtract(30, 'days')
//     .format('YYYY-MM-DD');
//   var endDate = moment().format('YYYY-MM-DD');
//   client.getTransactions(
//     ACCESS_TOKEN,
//     startDate,
//     endDate,
//     {
//       count: 250,
//       offset: 0
//     },
//     function(error, transactionsResponse) {
//       if (error != null) {
//         console.log(JSON.stringify(error));
//         return response.json({
//           error: error
//         });
//       }
//       console.log(
//         'pulled ' + transactionsResponse.transactions.length + ' transactions'
//       );
//       response.json(transactionsResponse);
//     }
//   );
// });

var server = app.listen(APP_PORT, function() {
  console.log('plaid-walkthrough server listening on port ' + APP_PORT);
});
