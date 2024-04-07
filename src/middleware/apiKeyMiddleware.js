const { generateToken } = require("../jwt");
require("dotenv").config();
const DatabaseMiddleware = require("./dbMiddleware");

async function createConnectionByAccessKey(apiAccessKey) {
  let client;
  try {

    const dbMiddleware = new DatabaseMiddleware();
    const pool = await dbMiddleware.dbMiddleware();
    const result = await pool.query(
      "SELECT login, us_dbname FROM users WHERE token = $1 and id = 2",
      [apiAccessKey]
    );
    client = await pool.connect();
    if (result.rows.length === 0) {
      return { status: "error", message: "Chave de Api inválida", token: null };
    }
    const user = result.rows[0];
    const tokenData = {
      cli_host: process.env.HOST || "localhost",
      cli_user: process.env.USUARIO,
      port: process.env.PORT || 5006,
      password: process.env.PASSWORD,
      database: user.us_dbname,
    };
    const token = generateToken(tokenData);
    return {
      status: "success",
      message: "Chave de Api inválida",
      token: token,
    };
  } catch (error) {
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
}

module.exports = { createConnectionByAccessKey };
