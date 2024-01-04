const GetMetasService = require('../services/getMetasService');
const DbMiddleware = require('../middleware/dbMiddleware');

class GetMetasController {
  constructor() {
    this.getMetasService = new GetMetasService();
  }

  async getMetas(req, res) {

    try {
      await this.getMetasService.getMetas(req, res);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}

module.exports = GetMetasController;