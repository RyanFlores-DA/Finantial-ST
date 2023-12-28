const { Pool } = require('pg');
require = ('dotenv/config');
class db{
  constructor(){
    
  }
async createPool(user) {
  return new Pool({
    user: process.env.USUARIO,
    host: process.env.HOST || 'localhost',
    database: `${user}`,
    password: process.env.PASSWORD,
    port: process.env.PORT || 3337,
  });
}
}
module.exports = db;