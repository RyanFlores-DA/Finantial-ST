const { Pool } = require('pg');
require("dotenv").config();

class DatabaseMiddleware {
  constructor() {}

  async dbMiddleware() {
    return new Pool({
      user: process.env.USUARIO,
      host: process.env.HOST,
      database: process.env.DATABASE,
      password: process.env.PASSWORD,
      port: process.env.PORT || 5006,
    });
  }
}

module.exports = DatabaseMiddleware;
