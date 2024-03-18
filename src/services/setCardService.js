const Database = require('../db')
const CriptografarService = require('./criptografarDados')

class SetCardService {
  constructor() {
    this.criptografarService = new CriptografarService;
  }

  async setCards(req, res) {
    try {
      this.database = new Database();
      const input = req.query;
      const pool = await this.database.createPool(req.user.database);
      const client = await pool.connect();

      const criptografado = await this.criptografarService.criptografarDadosCartao(input.numero, input.cvv);

      const result = await client.query(`insert into card (
        card_nm_cpt, 
        card_nm_iv, 
        card_nm_tag, 
        card_apelido, 
        card_cvv_cpt,
        card_cvv_iv,
        card_cvv_tag,
        card_primario,
        card_data_exp,
        card_key_secret) 
        VALUES ('${criptografado.criptografadoNumero}', '${criptografado.iv.toString('hex')}', '${criptografado.tagNumero.toString('hex')}',
      '${input.apelido}',
      '${criptografado.criptografadoCvv}', 
      '${criptografado.iv.toString('hex')}', 
      '${criptografado.tagCvv.toString('hex')}', 
      '${input.primario}', 
      '${input.data}',
      '${criptografado.chaveDeCriptografia}')`);

      return result.rowCount;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = SetCardService;