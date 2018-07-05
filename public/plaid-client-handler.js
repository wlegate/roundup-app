/**
 * Summary. (use period)
 *
 * Description. (use period)
 *
 * @since      x.x.x
 * @deprecated x.x.x Use new_function_name() instead.
 * @access     private
 *
 * @class
 * @augments parent
 * @mixes    mixin
 * 
 * @alias    realName
 * @memberof namespace
 *
 * @see  Function/class relied on
 * @link URL
 * @global
 *
 * @fires   eventName
 * @fires   className#eventName
 * @listens event:eventName
 * @listens className~event:eventName
 *
 * @param {type}   var           Description.
 * @param {type}   [var]         Description of optional variable.
 * @param {type}   [var=default] Description of optional variable with default variable.
 * @param {Object} objectVar     Description.
 * @param {type}   objectVar.key Description of a key in the objectVar parameter.
 * 
 * @return {type} Description.
 */


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
    // exchange the temporary Plaid public token for an access token
    $.post(ROUTES.ADMIN.GET_ACCESS_TOKEN, { public_token });
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
    // TODO: Log events in analytics
    // Optionally capture Link flow events, streamed through
    // this callback as your users connect an Item to Plaid.
    // For example:
    // eventName = "TRANSITION_VIEW"
    // metadata  = {
    //   link_session_id: "123-abc",
    //   mfa_type:        "questions",
    //   timestamp:       "2017-09-14T14:42:19.350Z",
    //   view_name:       "MFA",
    // }
  }
});

module.exports = handler;
