require('dotenv').config();

const fs = require('fs');
const pg = require('pg');

const client = new pg.Client();
client.connect();

const sql = fs.readFileSync('./scripts/create-db.sql');

const query = client.query(sql);
query.on('end', () => {
  client.end();
});
