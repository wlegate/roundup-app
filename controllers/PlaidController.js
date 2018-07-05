// const client = require('./../dbclient'); // for DB client
const { client } = require('./../server'); // for Plaid client

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

module.exports = { getAccessTokenAndItemID, getItemDetails };