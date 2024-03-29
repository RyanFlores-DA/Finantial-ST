const Database = require("../db");
class GetDespesasService {
  constructor() {}
  async getDespesas(req, res) {
    let client;
    try {
      this.database = new Database();

      const params = req.query;
      const pool = await this.database.createPool(req.user.database);
      client = await pool.connect();

      const resultados = await client.query(
        `SELECT sum(despesa_valor)as valor_despesas FROM despesas WHERE despesa_ativa = 'S'`
      );

      return resultados;
    } catch (error) {
      throw error;
    } finally {
      if (client) {
        client.release();
      }
    }
  }
}

module.exports = GetDespesasService;
