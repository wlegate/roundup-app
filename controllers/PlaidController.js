// const client = require('./../dbclient'); // for DB client
const { client } = require('./../server'); // for Plaid client
// const client = require('./../public/plaid-client');

const getAccessTokenAndItemID = (req, res, next) => {
  console.log('in getAccessTokenAndItemID');
  const { public_token } = req.body;
  client.exchangePublicToken(public_token, (error, tokenResponse) => {
    if (error != null) {
      let msg = 'Could not exchange public_token!';
      console.log(msg + '\n' + error);
    }
    res.locals.access_token = tokenResponse.access_token;
    res.locals.item_id = tokenResponse.item_id;
    next();
  });
}

const getItemDetails = (req, res, next) => {
  client.getAuth(res.locals.access_token, function (error, response) {
    if (error != null) {
      var msg = 'Unable to pull accounts from Plaid API.';
      console.log(msg + '\n' + error);
    }
    res.locals.accounts = response.accounts;
    next();
  });
}

const getTransactions = (req, res, next) => {
  let access_token = 'access-sandbox-c619a4eb-af14-4a94-970c-1ee949969cf9';
  client.getTransactions(access_token, '2017-01-01', '2017-12-31', { count: 10, offset: 0 }, function (error, response) {
    if (error != null) {
      var msg = 'Unable to pull accounts from Plaid API.';
      console.log(msg + '\n' + error);
    }
    res.locals.transactions = response.transactions;
    console.log(response.transactions);
    next();
  });
}

module.exports = { getAccessTokenAndItemID, getItemDetails, getTransactions };