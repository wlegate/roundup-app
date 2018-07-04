const { Client } = require('pg');

const dbClient = new Client({
  user: 'bgltsdrdwkchnh',
  database: 'df4tqf14k2eia6',
  password: '065603fec8872bf895608c64a8df12a79a41aea7bd9ee520a048e981282c12c4',
  port: 5432,
  host: 'ec2-54-225-103-255.compute-1.amazonaws.com',
  ssl: true
});

dbClient.connect();

module.exports = dbClient;