const { Pool } = require('pg');
class db{
  constructor(){
    
  }
async createPool(user) {
  return new Pool({
    user: 'ryan',
    host: '191.252.204.101',
    database: `${user}`,
    password: '1234',
    port: 5432,
  });
}
}
module.exports = db;