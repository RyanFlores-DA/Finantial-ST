const Database = require('../db')
const crypto = require('crypto')
class GetCardService {
  constructor() {
  }
  
  async descriptografarDado(iv, criptografado, tag, chave) {
    return new Promise((resolve, reject) => {
      const chaveDeCriptografia = chave;
      const keyLength = 32; 
      const paddedKey = Buffer.alloc(keyLength, chaveDeCriptografia, 'utf-8');
      const decipher = crypto.createDecipheriv('aes-256-gcm', paddedKey, Buffer.from(iv, 'hex'));

      decipher.setAuthTag(Buffer.from(tag, 'hex'));
      
      let descriptografado = decipher.update(criptografado, 'hex', 'utf-8');

      descriptografado += decipher.final('utf-8');
      
      resolve(descriptografado);
    });
  }

  async getCards(req, res) {
    try {
      this.database = new Database();
      
      const pool = await this.database.createPool(req.user.database);
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM card');
      const [numero, cvv] = await Promise.all(
        result.rows.map(row => (
          this.descriptografarDado(row.card_nm_iv, row.card_nm_cpt, row.card_nm_tag, row.card_key_secret)
        ),
        result.rows.map(row => (
          console.log(row.card_cvv_iv, row.card_cvv_cpt, row.card_cvv_tag, row.card_key_secret)
          // this.descriptografarDado(row.card_cvv_iv, row.card_cvv_cpt, row.card_cvv_tag, row.card_key_secret)
        )))
      );

      return {
        numero
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = GetCardService;