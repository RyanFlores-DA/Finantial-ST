const Database = require('../db')
const crypto = require('crypto')
class GetAssinaturasService {
  constructor() {
  }
  async getAssinaturas(req, res) {
    try {
      this.database = new Database();
      
      const params = req.query;
      const pool = await this.database.createPool(req.user.database);
      const client = await pool.connect();
      
      const resultados = await client.query('select * from vw_assinaturas');
      return res.status(200).json(resultados.rows);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = GetAssinaturasService;