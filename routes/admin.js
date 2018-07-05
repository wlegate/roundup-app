const express = require('express');
const router = express.Router();
const TransactionController = require('./../controllers/TransactionController');

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
 *    is_pending,
 *    iso_currency_code,
 *    type,
 *  },
 *  …
 * ]
 *
 * NOTE: _id, charge_id, and plaid_pending_transaction_id fields are omitted
 */
router.post('/transactions',
  TransactionController.createTransactions,
  (req, res) => { res.send('posted transactions') }
);

router.get('/transactions', (req, res) => {
  res.send('testing 1, 2, 3…');
});

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
router.post('/accounts', (req, res) => { });

module.exports = router;
