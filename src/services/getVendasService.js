const Database = require('../db')
const crypto = require('crypto')
class GetVendasService {
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

    async getVendas(req, res) {
        try {

            this.database = new Database();
            
            const date = new Date();
            const dia = '01';
            const mes = date.getMonth() +1;
            let mesPlusThirty = date.getMonth() + 2;
            let ano = date.getFullYear();
            let anoPlusOne = date.getFullYear();
            
            if ((date.getMonth() + 2) > 12) {
                mesPlusThirty = '01';
                anoPlusOne = date.getFullYear() + 1;
            }else{
            }
            
            const fullDay = `${ano}-${mes}-${dia}`;
            const fullDayPlusThirty = `${anoPlusOne}-${mesPlusThirty}-${dia}`;

            const pool = await this.database.createPool(req.user.database);
            const client = await pool.connect();

            const result = await client.query(`SELECT * FROM vendas WHERE fin_dt_inicio BETWEEN '${fullDay}' AND '${fullDayPlusThirty}'`);
            const resultados = await Promise.all(
                result.rows.map(async x => {
                    const numeroCartao = await this.descriptografarDado(x.card_nm_iv, x.card_nm_cpt, x.card_nm_tag, x.card_key_secret);

                    return {
                        "status": x.stt_descricao,
                        "descricao": x.fin_descricao,
                        "valor": x.fin_valor,
                        "Cartão": `****${numeroCartao.substring(4)}`
                    };
                })
            );

            if (resultados.length <= 0) {
                return res.status(200).json('Nenhuma venda encontrada para esse periodo!');
            }else{
                return res.status(200).json(resultados);
            }

        } catch (error) {
            throw error;
        }
    }
}

module.exports = GetVendasService;