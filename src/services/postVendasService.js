const Database = require('../db')
const DescriptografarService = require('./descriptografarService');
const ReplicaParcelas = require('../utils/replicaParcelas')

class PostVendasService {
    constructor() {
        this.descriptografarDado = new DescriptografarService;
        this.replicaParcelas = new ReplicaParcelas;
    }

    async inserirVendas(req, res) {
        let client;
        try {
            const parametros = req.body;
            this.database = new Database();
            const pool = await this.database.createPool(req.user.database);
            client = await pool.connect();

            const parcelas = await this.replicaParcelas.replicarParcelas(parametros.parcelas, parametros.dataVenda);

            let data = new Date(parametros.dataVenda);
            let mes = data.getMonth() + 1;

            let response;
            if (parametros.natureza = 'CREDITO') {
                for (let i = 0; i < parametros.parcelas; i++) {
                    response = await client.query(`INSERT INTO financas (fin_descricao, fin_dt_venda, fin_fk_tipo, fin_fk_card, fin_fk_plano, fin_fk_banco, fin_valor, fin_dt_parcela, fin_parcela, fin_fk_mes) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, [
                        parametros.descricao,
                        parametros.dataVenda,
                        parametros.tipo,
                        parametros.cartao,
                        parametros.plano,
                        parametros.banco,
                        parametros.valor,
                        parcelas[i],
                        i+1,
                        mes
                    ]);
                }
            }else{
                response = await client.query(`INSERT INTO financas (fin_descricao, fin_dt_venda, fin_fk_tipo, fin_fk_card, fin_fk_plano, fin_fk_banco, fin_valor, fin_dt_parcela, fin_parcela, fin_fk_mes) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, [
                        parametros.descricao,
                        parametros.dataVenda,
                        parametros.tipo,
                        parametros.cartao,
                        0,
                        parametros.banco,
                        parametros.valor,
                        parcelas[i],
                        1,
                        mes
                    ]);
            }

            return   {"mensagem": `${response.rowCount} vendas inseridas`} ;
        } catch (error) {
            throw error;
        }finally {
            if (client) {
              client.release();
            }
        }
    }
}

module.exports = PostVendasService;