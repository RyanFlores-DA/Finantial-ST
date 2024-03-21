const Database = require("../db");
const DescriptografarService = require("./descriptografarService");
const ReplicaParcelas = require("../utils/replicaParcelas");

class PostVendasService {
  constructor() {
    this.descriptografarDado = new DescriptografarService();
    this.replicaParcelas = new ReplicaParcelas();
  }

  async inserirVendas(req, res) {
    let client;
    try {
      const parametros = req.body;
      this.database = new Database();
      const pool = await this.database.createPool(req.user.database);
      client = await pool.connect();

      const parcelas = await this.replicaParcelas.replicarParcelas(
        parametros.parcelas,
        parametros.dataVenda
      );

      let data = new Date(parametros.dataVenda);
      let mes = data.getMonth() + 1;

      let response;
      if (parametros.natureza == 2) {
        for (let i = 0; i < parametros.parcelas; i++) {
          response = await client.query(
            `INSERT INTO financas (fin_descricao, fin_dt_venda, fin_fk_tipo, fin_fk_card, fin_fk_plano, fin_fk_banco, fin_valor, fin_dt_parcela, fin_parcela, fin_fk_mes, fin_fk_natureza) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,  $11)`,
            [
              parametros.descricao,
              parametros.dataVenda,
              parametros.tipo,
              parametros.cartao,
              parametros.parcelas + 1,
              parametros.banco,
              parametros.valor,
              parcelas[i],
              i + 1,
              mes,
              parametros.natureza,
            ]
          );
        }
      } else {

        let cartao;
        parametros.natureza == 1 ? cartao = 0 : parametros.cartao;
        response = await client.query(
          `INSERT INTO financas (fin_descricao, fin_dt_venda, fin_fk_tipo, fin_fk_card, fin_fk_plano, fin_fk_banco, fin_valor, fin_dt_parcela, fin_parcela, fin_fk_mes, fin_fk_natureza, fin_fk_status) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 2)`,
          [
            parametros.descricao,
            parametros.dataVenda,
            parametros.tipo,
            cartao,
            0,
            parametros.banco,
            parametros.valor,
            parametros.dataVenda,
            0,
            mes,
            parametros.natureza,
          ]
        );
      }
      return {
        status: `ok`,
        mensagem: `Venda inserida`,
      };
    } catch (error) {
      return {
        status: `Error`,
        mensagem: `Erro ao inserir vendas`,
        error: error
      };
    } finally {
      if (client) {
        client.release();
      }
    }
  }
}

module.exports = PostVendasService;
