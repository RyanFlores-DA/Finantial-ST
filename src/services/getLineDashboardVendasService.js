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
            CASE
            WHEN
              (EXTRACT(MONTH FROM fin_dt_venda)) = 1 THEN 'Janeiro'
              WHEN (EXTRACT(MONTH FROM fin_dt_venda)) = 2 THEN 'Fevereiro'
              WHEN (EXTRACT(MONTH FROM fin_dt_venda)) = 3 THEN 'Março'
              WHEN (EXTRACT(MONTH FROM fin_dt_venda)) = 4 THEN 'Abril'
              WHEN (EXTRACT(MONTH FROM fin_dt_venda)) = 5 THEN 'Maio'
              WHEN (EXTRACT(MONTH FROM fin_dt_venda)) = 6 THEN 'Junho'
              WHEN (EXTRACT(MONTH FROM fin_dt_venda)) = 7 THEN 'Julho'
              WHEN (EXTRACT(MONTH FROM fin_dt_venda)) = 8 THEN 'Agosto'
              WHEN (EXTRACT(MONTH FROM fin_dt_venda)) = 9 THEN 'Setembro'
              WHEN (EXTRACT(MONTH FROM fin_dt_venda)) = 10 THEN 'Outubro'
              WHEN (EXTRACT(MONTH FROM fin_dt_venda)) = 11 THEN 'Novembro'
              WHEN (EXTRACT(MONTH FROM fin_dt_venda)) = 12 THEN 'Dezembro'
            END AS label,
            EXTRACT(MONTH FROM fin_dt_venda) AS ordenador,
            SUM(fin_valor) AS total_valor
            FROM vendas `;
      let filtros = [];

      switch (parametros.mes) {
        case "3":
          repositorio += `
                WHERE fin_dt_venda >= CURRENT_DATE - INTERVAL '3 months'
                GROUP BY (EXTRACT(MONTH FROM fin_dt_venda))
                ORDER BY fin_dt_venda DESC
                LIMIT 3
                `;
          break;
        case "6":
          repositorio += `
                WHERE fin_dt_venda >= CURRENT_DATE - INTERVAL '6 months'
                GROUP BY (EXTRACT(MONTH FROM fin_dt_venda))
                ORDER BY fin_dt_venda DESC
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
                GROUP BY (EXTRACT(MONTH FROM fin_dt_venda))
                ORDER BY fin_dt_venda
                `;
            filtros = [parametros.data_inicio, parametros.data_final];
          } else {
            //QUERY COM DATAS
            repositorio = `
                    SELECT 
                    to_char(fin_dt_venda, 'DD/MM/YYYY') as label,
                    SUM(fin_valor) AS total_valor
                    FROM vendas 
                    WHERE fin_dt_venda between $1 AND $2
                    GROUP BY (EXTRACT(MONTH FROM fin_dt_venda))
                    ORDER BY fin_dt_venda
                    `;

            filtros = [parametros.data_inicio, parametros.data_final];
          }
          break;
        default:
          repositorio += `
                WHERE fin_dt_venda >= CURRENT_DATE - INTERVAL '3 months'
                GROUP BY (EXTRACT(MONTH FROM fin_dt_venda))
                ORDER BY fin_dt_venda
                `;
          break;
      }
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
