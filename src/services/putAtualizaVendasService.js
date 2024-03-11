const Database = require('../db')

class AtualizaVendasService{
    constructor(){
        
    }
    async putAtualizaVendasService(req, res){
        let client;
        try {
            this.database = new Database();
            const pool = await this.database.createPool(req.user.database);
            client = await pool.connect();
            const parametros = req.body;
            const idVenda = parametros.id_venda;
            const statusVenda = parametros.status_venda;
            const repositorio = "UPDATE financas set fin_fk_status = $1 WHERE fin_id = $2";

            const resultado = await pool.query(repositorio, [statusVenda, idVenda]);

            return resultado;
        } catch (error) {
            console.log(error);
        }finally {
            if (client) {
              client.release();
            }
          }
    }
}

module.exports = AtualizaVendasService;