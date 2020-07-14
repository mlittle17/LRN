const pgp = require('pg-promise')({});
require('dotenv').config();

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;



const db = pgp({
  user: DB_USER,
  password: DB_PASS,
  host: 'localhost',
  //host: `/cloudsql/${process.env.DB_INSTANCE}`,
  port: 5432,
  database: DB_NAME,

});

module.exports = db;
