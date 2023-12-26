const GetCardkService = require('../services/getCardService');
const DbMiddleware = require('../middleware/dbMiddleware');

class CardController {
  constructor() {
    this.getCardService = new GetCardkService();
  }

  async getCards(req, res) {

    try {
      const cards = await this.getCardService.getCards(req, res);
      return res.json(cards);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}

module.exports = CardController;