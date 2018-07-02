### plaid-node quickstart

[Quickstart guide](https://plaid.com/docs/quickstart)

```bash
git clone https://github.com/plaid/quickstart.git
cd quickstart/node
npm install

# The above call defaults to test/tartan credentials.
# Substitute other values with any of the following:
APP_PORT=8000 \
PLAID_CLIENT_ID=5a25fd8bbdc6a4494a7c7f70 \
PLAID_SECRET=11a8f6f4e4e42912d21a33ce67d9f9 \
PLAID_PUBLIC_KEY=fc0c3b87ad657003cfedb41be91409 \
PLAID_ENV=sandbox \
node index.js
# Go to http://localhost:8000
```
