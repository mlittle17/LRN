const { Pool } = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'password',
  host: 'localhost',
  port: 8000,
  database: 'lrn',

});

module.exports = pool;
