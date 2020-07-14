const pgp = require('pg-promise')({});
require('dotenv').config()



const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
// const DB_HOST = process.env.DB_HOST;

const db = pgp({
  user: 'postgres',
  password: 'password',
  host: 'localhost',
  port: 5432,
  database: 'lrn',

  // user: DB_USER,
  // password: DB_PASS,
  // host: 'localhost',
  // port: 5432,
  // database: 'lrn',

  // user: DB_USER,
  // password: DB_PASS,
  // host: 'localhost',
  // port: 5432,
  // database: 'lrn',

});

module.exports = db;
