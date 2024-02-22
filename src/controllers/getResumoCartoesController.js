const GetResumoCartoesService = require("../services/getResumoCartoesService");

class GetResumoCartoesController {
  constructor() {
    this.getResumoCartoesService = new GetResumoCartoesService();
  }

  async getResumoCartoes(req, res, next) {
    try {
      const response = await this.getResumoCartoesService.getResumoCartoes(
        req,
        res
      );

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GetResumoCartoesController;
