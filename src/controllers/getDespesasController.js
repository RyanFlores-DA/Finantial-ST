const GetDespesasService = require('../services/getDespesasService');
const DbMiddleware = require('../middleware/dbMiddleware');

class GetDespesasController {
  constructor() {
    this.getDespesasService = new GetDespesasService();
  }

  async getMetas(req, res) {

    try {
      await this.getDespesasService.getDespesas(req, res);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}

module.exports = GetDespesasController;