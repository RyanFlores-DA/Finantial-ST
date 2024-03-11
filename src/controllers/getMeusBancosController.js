const GetMeusBancosService = require('../services/getMeusBancosService');
const DbMiddleware = require('../middleware/dbMiddleware');

class GetMeusBancosController {
  constructor() {
    this.getMeusBancosService = new GetMeusBancosService();
  }

  async getMeusBancos(req, res) {

    try {
      const resultados = await this.getMeusBancosService.getMeusBancos(req, res);

      res.status(200).json(resultados);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}

module.exports = GetMeusBancosController;