module.exports = {
  APP_NAME: 'Pennies for Progress',
  PLAID: {
    CLIENT_ID: '5a25fd8bbdc6a4494a7c7f70',
    SECRET: '11a8f6f4e4e42912d21a33ce67d9f9',
    PUBLIC_KEY: 'fc0c3b87ad657003cfedb41be91409',

    // TODO: Is this being used?
    WEBHOOK_URI: 'https://legate-request-bin.herokuapp.com/1agjr801'
  },
  ROUTES: {
    CLIENT: {
      LOGIN: '/login',
      TRANSACTIONS: '/transactions',
      ACCOUNTS: '/accounts'
    },
    API: {
      PUBLIC: {},
      ADMIN: {
        GET_ACCESS_TOKEN: '/get_access_token'
      }
    }
  }
};
