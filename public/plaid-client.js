const handler = Plaid.create({
    // TODO: Update from client name from constants file
    clientName: 'Plaid Demo',
    // TODO: Update based on ENV variable
    env: 'sandbox',
    // TODO: Use value from constants file or ENV variable instead of hardcoded key
    key: 'fc0c3b87ad657003cfedb41be91409',
    // TODO: Is this the only product we need?
    product: ['transactions'],
    // Webhook for transaction and error updates…
    // TODO: Set to correct endpoint
    webhook: 'https://legate-request-bin.herokuapp.com/1agjr801',
    onLoad: () => {
      // Optional, called when Link loads
    },
    onSuccess: (public_token, metadata) => {
      console.log(`onSuccess:\n\npublic_token:\n${JSON.stringify(public_token, null, 2)}`);

      // Send the public_token to your app server.
      // The metadata object contains info about the institution the
      // user selected and the account ID, if the Account Select view
      // is enabled.
      $.post('/get_access_token', {
        public_token: public_token,
      });
    },
    onExit: (err, metadata) => {
      console.log(`onExit:\n\nerr:\n${JSON.stringify(err, null, 2)}`);
      // The user exited the Link flow.
      if (err != null) {
        // The user encountered a Plaid API error prior to exiting.
      }
      // metadata contains information about the institution
      // that the user selected and the most recent API request IDs.
      // Storing this information can be helpful for support.
    },
    onEvent: (eventName, metadata) => {
      console.log(`onEvent:\n\neventName:\n${JSON.stringify(eventName, null, 2)}`);
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