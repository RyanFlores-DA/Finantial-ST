const Database = require("../db");
const crypto = require("crypto");
class GetCardService {
  constructor() {}

  async descriptografarDado(iv, criptografado, tag, chave) {
    return new Promise((resolve, reject) => {
      const chaveDeCriptografia = chave;
      const keyLength = 32;
      const paddedKey = Buffer.alloc(keyLength, chaveDeCriptografia, "utf-8");
      const decipher = crypto.createDecipheriv(
        "aes-256-gcm",
        paddedKey,
        Buffer.from(iv, "hex")
      );

      decipher.setAuthTag(Buffer.from(tag, "hex"));

      let descriptografado = decipher.update(criptografado, "hex", "utf-8");

      descriptografado += decipher.final("utf-8");

      resolve(descriptografado);
    });
  }

  async getCards(req, res) {
    let client;
    try {
      this.database = new Database();

      const params = req.query;
      const pool = await this.database.createPool(req.user.database);
      client = await pool.connect();
      let repository = "";
      switch (params.primario) {
        case "S":
          repository = `SELECT * FROM vw_card where card_primario = 'S'`;
          break;
        default:
          repository = `SELECT * FROM vw_card where card_primario = 'N'`;
          break;
      }
      const result = await client.query(repository);
      const resultados = await Promise.all(
        result.rows.map(async (x) => {
          const numeroCartao = await this.descriptografarDado(
            x.card_nm_iv,
            x.card_nm_cpt,
            x.card_nm_tag,
            x.card_key_secret
          );
          const cvv = await this.descriptografarDado(
            x.card_cvv_iv,
            x.card_cvv_cpt,
            x.card_cvv_tag,
            x.card_key_secret
          );
          const nome = x.card_apelido;
          const data = x.card_data_exp;
          return {
            numero: `************${numeroCartao.substring(12)}`,
            nome: nome,
            data: data,
            cvv: cvv,
          };
        })
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

module.exports = GetCardService;
