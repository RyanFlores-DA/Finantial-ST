const Database = require("../db");

class PostDespesasService {
  constructor() {

  }

  async inserirDespesas(req, res) {
    let client;
    try {
      const parametros = req.body;
      this.database = new Database();
      const pool = await this.database.createPool(req.user.database);
      client = await pool.connect();

      let response;
        response = await client.query(
            `INSERT INTO despesas (despesa_titulo, despesa_descricao, despesa_tipo, despesa_valor) 
                    VALUES ($1, $2, $3, $4)`,
            [
              parametros.titulo,
              parametros.descricao,
              parametros.tipo,
              parametros.valor,
            ]
          );
      return {
        status: `ok`,
        mensagem: `Despesa inserida`,
      };
    } catch (error) {
        console.log(error);
      return {
        status: `Error`,
        mensagem: `Erro ao inserir depesa`,
        error: error
      };
    } finally {
      if (client) {
        client.release();
      }
    }
  }
}

module.exports = PostDespesasService;
