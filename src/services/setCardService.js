const Database = require('../db')
const crypto = require('crypto')
require('dotenv').config();
class SetCardService {
  constructor() {
  }

  async setCards(req, res) {
    try {
      this.database = new Database();
      const input = req.query;
      const pool = await this.database.createPool(req.user.database);
      const client = await pool.connect();

      const chaveDeCriptografia = process.env.FULLCARD;
      const iv = crypto.randomBytes(16);


      const keyLength = 32; 
      const paddedKey = Buffer.alloc(keyLength, chaveDeCriptografia, 'utf-8');



      const cipherNumero = crypto.createCipheriv('aes-256-gcm', paddedKey, iv);
      let criptografadoNumero = cipherNumero.update(input.numero, 'utf-8', 'hex');
      criptografadoNumero += cipherNumero.final('hex');
      const tagNumero = cipherNumero.getAuthTag();

      const cipherCvv = crypto.createCipheriv('aes-256-gcm', paddedKey, iv);
      let criptografadoCvv = cipherCvv.update(input.cvv, 'utf-8', 'hex');
      criptografadoCvv += cipherCvv.final('hex');
      const tagCvv = cipherCvv.getAuthTag();
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
        VALUES ('${criptografadoNumero}', '${iv.toString('hex')}', '${tagNumero.toString('hex')}',
      '${input.apelido}',
      '${criptografadoCvv}', 
      '${iv.toString('hex')}', 
      '${tagCvv.toString('hex')}', 
      '${input.primario}', 
      '${input.data}',
      '${chaveDeCriptografia}')`);

      return result.rowCount;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = SetCardService;