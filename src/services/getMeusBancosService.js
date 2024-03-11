const Database = require("../db");
const crypto = require("crypto");
class GetMeusBancosService {
  constructor() {}
  async getMeusBancos(req, res) {
    let client;
    try {
      this.database = new Database();

      const params = req.query;
      const pool = await this.database.createPool(req.user.database);
      client = await pool.connect();

      const resultados = await client.query("select m.mb_id as id, b.bank_descript as descricao from meu_banco m inner join dim_bank b on (b.id = m.mb_fk_bank) WHERE mb_ativo = 'S' ");

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

module.exports = GetMeusBancosService;
