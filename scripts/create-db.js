require('dotenv').config();

const fs = require('fs');
const pg = require('pg');

const connectionString =
  process.env.DATABASE_URL || 'postgres://localhost:5432/roundup-app-db';
const client = new pg.Client(connectionString);
client.connect();
const sql = fs.readFileSync('./scripts/create-db.sql');
const query = client.query(sql);
query.on('end', () => {
  client.end();
});
