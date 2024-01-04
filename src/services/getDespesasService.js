const Database = require('../db')
const crypto = require('crypto')
class GetDespesasService {
  constructor() {
  }
  async getDespesas(req, res) {
    try {
      this.database = new Database();
      
      const params = req.query;
      const pool = await this.database.createPool(req.user.database);
      const client = await pool.connect();
      
      const resultados = await client.query(`SELECT sum(despesa_valor)as valor_despesas FROM despesas WHERE despesa_ativa = 'S'`);
      return res.status(200).json(resultados.rows);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = GetDespesasService;