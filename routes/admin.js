// const router = require('./../index');
const express = require('express');
const router = express.Router();
const { client } = require('./../server');
const PlaidController = require('./../controllers/PlaidController');
const AccountController = require('./../controllers/AccountController');
const UserController = require('./../controllers/UserController');

/**
 * Body:
 * [
 *  {
 *    account_id,
 *    user_id,
 *    amount,
 *    categories,
 *    date,
 *    location,
 *    name,
 *    pending,
 *    iso_currency_code,
 *    transaction_type,
 *  },
 *  …
 * ]
 *
 * NOTE: _id, charge_id, and plaid_pending_transaction_id fields are omitted
 */

router.post('/get_access_token',
  UserController.getUserID,
  PlaidController.getAccessTokenAndItemID,
  PlaidController.getItemDetails,
  AccountController.createAccounts,
  AccountController.fetchAccounts,
);

router.post('/transactions', (req, res) => { });


/**
 * Creates db Item and Account(s)
 *
 *  Request Body (Object or Array of Objects):
 *  {
 *    user_id: Number,
 *    plaid_item_id: String,
 *    iso_currency_code: String,
 *    name: String,
 *    official_name: String,
 *    type: String,
 *    subtype: String,
 *    plaid_access_token: String,
 *    stripe_bank_account_token: String,
 *  }
 *
 * Response Body: (an array of Account objects created in database)
 *
 */

module.exports = router;
