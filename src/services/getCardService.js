const Database = require('../db')
const crypto = require('crypto')
class GetCardService {
  constructor() {
  }
  
  async descriptografarDado(iv, criptografado, tag, chave) {
    const chaveDeCriptografia = chave;
    const keyLength = 32; 
    const paddedKey = Buffer.alloc(keyLength, chaveDeCriptografia, 'utf-8');
    const decipher = crypto.createDecipheriv('aes-256-gcm', paddedKey, Buffer.from(iv, 'hex'));

    decipher.setAuthTag(Buffer.from(tag, 'hex'));
    
    let descriptografado = decipher.update(criptografado, 'hex', 'utf-8');

    descriptografado += decipher.final('utf-8');
    
    return descriptografado;
  }

  async getCards(req, res) {
    try {
      this.database = new Database();
      
      const pool = await this.database.createPool(req.user.database);
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM card');
      const decrypt = await this.descriptografarDado(result.rows[0].card_nm_iv, result.rows[0].card_nm_cpt, result.rows[0].card_nm_tag, result.rows[0].card_key_secret);
      
      return decrypt;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = GetCardService;