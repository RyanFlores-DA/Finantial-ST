const { Pool } = require('pg');
require = ('dotenv/config');

function createPublicPool() {
  return new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
  });
}

module.exports = createPublicPool;