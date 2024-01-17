const GetCaixaTotalService = require("../services/getCaixaTotalService");

class GetCaixaTotalController {
  constructor() {
    this.getCaixaTotalService = new GetCaixaTotalService();
  }

  async getTotalCaixa(req, res, next) {
    try {
      const response = await this.getCaixaTotalService.getTotalCaixa(req, res);

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GetCaixaTotalController;