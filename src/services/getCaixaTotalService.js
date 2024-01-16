const Database = require("../db");
class GetCaixaTotalService {
  constructor() {}
  async getTotalCaixa(req, res) {
    let client;
    try {
      this.database = new Database();

      const pool = await this.database.createPool(req.user.database);
      client = await pool.connect();

      const resultados = await client.query(
        `select sum(valor)as valor from vw_caixa` //MUDA PARA ENDPOINT EXCLUSIVO DE TOTAL DESPESA
      );

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

module.exports = GetCaixaTotalService;