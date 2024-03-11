const Database = require("../db");
const crypto = require("crypto");
class GetResumoCartoesService {
  constructor() {}
  async getResumoCartoes(req, res) {
    let client;
    try {
      this.database = new Database();

      const params = req.query;
      const pool = await this.database.createPool(req.user.database);
      client = await pool.connect();

      const resultados = await client.query("select * from gera_resumo()");

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

module.exports = GetResumoCartoesService;
