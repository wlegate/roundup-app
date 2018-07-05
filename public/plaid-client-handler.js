const { APP_NAME, ROUTES, PLAID } = require('./../config');

const handler = Plaid.create({
  clientName: APP_NAME,
  env: process.env.PLAID_ENV ? process.env.PLAID_ENV : 'sandbox',
  key: PLAID.PUBLIC_KEY,

  // TODO: Is this the only product we need?
  product: ['transactions'],

  /**
   * Webhook for transaction and error updates…
   * TODO: Set to correct endpoint
   */
  webhook: PLAID.WEBHOOK_URI,
  onSuccess: (public_token, metadata) => {
    /**
     * Exchange the temporary Plaid public token for an access token
     * NOTE: must prepend /admin since ROUTES.API.ADMIN.GET_ACCESS_TOKEN doesn't include the parent path component
     */
    $.post(`/admin${ROUTES.API.ADMIN.GET_ACCESS_TOKEN}`, { public_token });
  },
  onExit: (err, metadata) => {
    // user exited Plaid Link
    if (err != null) {
      // user encountered a Plaid API error prior to exiting.
      console.log(`ERROR (Plaid API): ${JSON.stringify(err)}`);
    }
    /**
     * TODO: Store metadata (where?)…
     * metadata contains information about the institution
     * that the user selected and the most recent API request IDs.
     * storing this information can be helpful for support.
     */
  },
  onEvent: (eventName, metadata) => {
    /**
     * TODO: Log events in analytics
     * Optionally capture Link flow events, streamed through
     * this callback as your users connect an Item to Plaid.
     * For example:
     * eventName = "TRANSITION_VIEW"
     * metadata  = {
     *  link_session_id: "123-abc",
     *  mfa_type:        "questions",
     *  timestamp:       "2017-09-14T14:42:19.350Z",
     *  view_name:       "MFA",
     * }
     */
  }
});

module.exports = handler;
