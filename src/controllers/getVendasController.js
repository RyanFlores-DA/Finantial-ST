const GetVendasService = require('../services/getVendasService');
const DbMiddleware = require('../middleware/dbMiddleware');

class getVendasController {
  constructor() {
    this.getVendasService = new GetVendasService();
  }

  async getVendas(req, res) {

    try {
      const vendas = await this.getVendasService.getVendas(req, res);
    //   return res.json(vendas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}

module.exports = getVendasController;