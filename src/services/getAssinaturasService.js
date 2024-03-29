const Database = require("../db");
const crypto = require("crypto");
class GetAssinaturasService {
  constructor() {}
  async getAssinaturas(req, res) {
    let client;
    try {
      this.database = new Database();

      const params = req.query;
      const pool = await this.database.createPool(req.user.database);
      client = await pool.connect();

      const resultados = await client.query("select * from vw_assinaturas");
      return resultados.rows;
    } catch (error) {
      throw error;
    } finally {
      if (client) {
        client.release();
      }
    }
  }
}

module.exports = GetAssinaturasService;
