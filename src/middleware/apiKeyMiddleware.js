const { generateToken } = require("../jwt");
require("dotenv").config();
const DatabaseMiddleware = require("./dbMiddleware");

async function createConnectionByAccessKey(apiAccessKey) {
  let client;
  try {

    const dbMiddleware = new DatabaseMiddleware();
    const pool = await dbMiddleware.dbMiddleware();
    const result = await pool.query(
      `SELECT login, us_dbname, t.token_ativo FROM users u inner join token_by_users t on(t.token_id = u.token) 
        WHERE token_codigo = $1`,
      [apiAccessKey]
    );
    client = await pool.connect();
    if (result.rows.length === 0) {
      return { status: "error", message: "Chave de Api inválida", dbname: null };
    }else if(result.rows[0].token_ativo === 'N'){
      return { status: "error", message: "Chave de api inativa", dbname: null };
    }
    const user = result.rows[0];
    return {
      status: "success",
      message: "Chave de Api inválida",
      dbname: user.us_dbname,
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
