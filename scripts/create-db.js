require('dotenv').config();

const fs = require('fs');
const { Client } = require('pg');

const client = new Client({
  connectionString:
    'postgres://bgltsdrdwkchnh:065603fec8872bf895608c64a8df12a79a41aea7bd9ee520a048e981282c12c4@ec2-54-225-103-255.compute-1.amazonaws.com:5432/df4tqf14k2eia6',
  ssl: true
});
client.connect();

const sql = fs.readFileSync('./scripts/create-db.sql');

const query = client.query(sql);
// query.on('end', () => {
//   client.end();
// });
