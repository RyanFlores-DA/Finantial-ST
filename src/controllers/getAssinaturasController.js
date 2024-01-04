const GetAssinaturasService = require('../services/getAssinaturasService');
const DbMiddleware = require('../middleware/dbMiddleware');

class GetAssinaturasController {
  constructor() {
    this.getAssinaturasService = new GetAssinaturasService();
  }

  async getMetas(req, res) {

    try {
      await this.getAssinaturasService.getAssinaturas(req, res);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}

module.exports = GetAssinaturasController;