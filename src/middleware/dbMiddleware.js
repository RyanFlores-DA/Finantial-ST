const Pool = require('pg');
require("dotenv").config();

async function dbMiddleware() {
  // const dbConfig = {
  //   user: process.env.USER,
  //   host: process.env.HOST,
  //   database: process.env.DATABASE,
  //   password: process.env.PASS,
  //   port: process.env.PORT || 5006,
  // };
  // const pool = createPool(dbConfig);

  return new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASS,
    port: process.env.PORT || 5006,
  });
}

module.exports = { dbMiddleware };
