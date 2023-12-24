// src/db.js
const { Pool } = require('pg');

function createPublicPool() {
  return new Pool({
    user: 'ryan',
    host: '191.252.204.101',
    database: 'control',
    password: '1234',
    port: 5432
  });
}

module.exports = createPublicPool;