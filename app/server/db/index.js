const pgp = require('pg-promise')({});

const db = pgp({
  user: 'maclittle',
  password: 'password',
  host: 'localhost',
  port: 5432,
  database: 'lrn',

});

module.exports = db;
