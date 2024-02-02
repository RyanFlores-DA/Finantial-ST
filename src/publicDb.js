const { Pool } = require('pg');
require = ('dotenv/config');

function createPublicPool() {
  return new Pool({
    user: process.env.USUARIO,
    host: process.env.HOST || 'localhost',
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT || 5006
  });
}

module.exports = createPublicPool;