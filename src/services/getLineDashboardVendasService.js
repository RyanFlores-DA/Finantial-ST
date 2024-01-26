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
              (EXTRACT(MONTH FROM fin_dt_inicio)) = 1 THEN 'Janeiro'
              WHEN (EXTRACT(MONTH FROM fin_dt_inicio)) = 2 THEN 'Fevereiro'
              WHEN (EXTRACT(MONTH FROM fin_dt_inicio)) = 3 THEN 'Março'
              WHEN (EXTRACT(MONTH FROM fin_dt_inicio)) = 4 THEN 'Abril'
              WHEN (EXTRACT(MONTH FROM fin_dt_inicio)) = 5 THEN 'Maio'
              WHEN (EXTRACT(MONTH FROM fin_dt_inicio)) = 6 THEN 'Junho'
              WHEN (EXTRACT(MONTH FROM fin_dt_inicio)) = 7 THEN 'Julho'
              WHEN (EXTRACT(MONTH FROM fin_dt_inicio)) = 8 THEN 'Agosto'
              WHEN (EXTRACT(MONTH FROM fin_dt_inicio)) = 9 THEN 'Setembro'
              WHEN (EXTRACT(MONTH FROM fin_dt_inicio)) = 10 THEN 'Outubro'
              WHEN (EXTRACT(MONTH FROM fin_dt_inicio)) = 11 THEN 'Novembro'
              WHEN (EXTRACT(MONTH FROM fin_dt_inicio)) = 12 THEN 'Dezembro'
            END AS label,
            EXTRACT(MONTH FROM fin_dt_inicio) AS ordenador,
            SUM(fin_valor) AS total_valor
            FROM vendas `;
      let filtros = [];

      switch (parametros.mes) {
        case "3":
          repositorio += `
                WHERE fin_dt_inicio >= CURRENT_DATE - INTERVAL '3 months'
                GROUP BY fin_dt_inicio
                ORDER BY fin_dt_inicio
                `;
          break;
        case "6":
          repositorio += `
                WHERE fin_dt_inicio >= CURRENT_DATE - INTERVAL '6 months'
                GROUP BY fin_dt_inicio
                ORDER BY fin_dt_inicio
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
                WHERE fin_dt_inicio between $1 AND $2
                GROUP BY fin_dt_inicio
                ORDER BY fin_dt_inicio
                `;
            filtros = [parametros.data_inicio, parametros.data_final];
          } else {
            //QUERY COM DATAS
            repositorio = `
                    SELECT 
                    to_char(fin_dt_inicio, 'DD/MM/YYYY') as label,
                    SUM(fin_valor) AS total_valor
                    FROM vendas 
                    WHERE fin_dt_inicio between $1 AND $2
                    GROUP BY fin_dt_inicio
                    ORDER BY fin_dt_inicio
                    `;

            filtros = [parametros.data_inicio, parametros.data_final];
          }
          break;
        default:
          repositorio += `
                WHERE fin_dt_inicio >= CURRENT_DATE - INTERVAL '3 months'
                GROUP BY fin_dt_inicio
                ORDER BY fin_dt_inicio
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
