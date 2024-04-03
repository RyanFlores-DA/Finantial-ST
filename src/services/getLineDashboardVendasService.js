const Database = require("../db");
class GetLineDashboardVendasService {
  constructor() {}
  async lineDashboardVendasService(req, res) {
    let client;
    try {
      this.database = new Database();
      const pool = await this.database.createPool(req.user.database);
      client = await pool.connect();
      const parametros = req.query;
      let repositorio = `
                SELECT
                m.mes as label,
                m.mes_id as ordenador,
                SUM(fin_valor_parcela) AS total_valor,
                v.fin_descricao
                FROM vendas v 
                INNER JOIN dim_mes m on(m.mes_id = v.fin_fk_mes) `;
      let filtros = [];

      switch (parametros.mes) {
        case "3":
          repositorio += `
                WHERE fin_dt_venda >= CURRENT_DATE - INTERVAL '4 months'
                GROUP BY m.mes, m.mes_id, fin_descricao
                ORDER BY m.mes_reverso DESC, m.mes_id 
                LIMIT 4
                `;
          break;
        case "6":
          repositorio += `
                WHERE fin_dt_venda >= CURRENT_DATE - INTERVAL '6 months'
                GROUP BY m.mes, m.mes_id, fin_descricao
                ORDER BY m.mes_reverso DESC, m.mes_id 
                LIMIT 6
                `;
          break;
        case "P":
          if (
            (new Date(parametros.data_inicio) -
              new Date(parametros.data_final)) /
              (24 * 60 * 60 * 1000) <
            -30
          ) {
            //QUERY COM OS MESES
            repositorio += `
                WHERE fin_dt_venda between $1 AND $2
                GROUP BY m.mes, m.mes_id, fin_descricao
                ORDER BY m.mes_reverso DESC, m.mes_id 
                `;
            filtros = [parametros.data_inicio, parametros.data_final];
          } else {
            //QUERY COM DATAS
            repositorio = `
                    SELECT 
                    to_char(fin_dt_venda, 'DD/MM/YYYY') as label,
                    SUM(fin_valor_parcela) AS total_valor,
                    v.fin_descricao
                    FROM vendas
                    INNER JOIN dim_mes m on(m.mes_id = v.fin_fk_mes) 
                    WHERE fin_dt_venda between $1 AND $2
                    GROUP BY m.mes, m.mes_id, fin_descricao
                    ORDER BY m.mes_reverso DESC, m.mes_id 
                    `;

            filtros = [parametros.data_inicio, parametros.data_final];
          }
          break;
        default:
          repositorio += `
                WHERE fin_dt_venda >= CURRENT_DATE - INTERVAL '3 months'
                GROUP BY m.mes, m.mes_id, fin_descricao
                ORDER BY m.mes_reverso DESC, m.mes_id 
                `;
          break;
      }
      console.log(repositorio);
      const resultado = await pool.query(repositorio, filtros);
      return { dataSets: resultado.rows };
    } catch (error) {
      console.log(error);
    } finally {
      if (client) {
        client.release();
      }
    }
  }
}
module.exports = GetLineDashboardVendasService;
