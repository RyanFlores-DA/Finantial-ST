const { Pool } = require('pg');

class TaskModel {
  constructor() {
    this.pool = new Pool();
  }

  async getTasks(database) {
    const client = await this.pool.connect();
    console.log(client);
    try {
      // Use o cliente da pool para se conectar à base de dados específica do cliente
      await client.query(`SET search_path TO ${database}`);

      // Execute a consulta na base de dados do cliente
      const result = await client.query('SELECT * FROM card');

      // Retorne os dados das tarefas
      return result.rows;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
}

module.exports = new TaskModel();