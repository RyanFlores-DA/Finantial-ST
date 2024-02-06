const Database = require('../db')
const DescriptografarService = require('./descriptografarService');

class GetVendasService {
    constructor() {
        this.descriptografarDado = new DescriptografarService;
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
                    const numeroCartao = await this.descriptografarDado.descriptografarDado(x.card_nm_iv, x.card_nm_cpt, x.card_nm_tag, x.card_key_secret);

                    return {
                        "status": x.stt_descricao,
                        "descricao": x.fin_descricao,
                        "data": x.data_venda,
                        "banco": x.bank_descript,
                        "valor": x.fin_valor,
                        "cartao": `****${numeroCartao.substring(4)}`
                    };
                })
            );

            if (resultados.length <= 0) {
                return res.status(200).json([{
                    'descricao':'Nenhuma venda encontrada para esse periodo!',
                    'banco': 0,
                    'data': 0,
                    'valor': 0
                }]);
            }else{
                return res.status(200).json(resultados);
            }

        } catch (error) {
            throw error;
        }
    }
}

module.exports = GetVendasService;