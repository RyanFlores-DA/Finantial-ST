const createPool = require('../db');
require('dotenv').config();

function dbMiddleware(req) {

  const dbConfig = {
    user: 'ryan',
    host: '191.252.204.101',
    database: `${req.user.database}`,
    password: process.env.PASS,
    port: 5432,
  };
  const pool = createPool(dbConfig);

  return req.pool = pool;

}

module.exports = dbMiddleware;
