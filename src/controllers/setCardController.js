const SetCardService = require('../services/setCardService');
const DbMiddleware = require('../middleware/dbMiddleware');

class SetCardController {
  constructor() {
    this.setCardService = new SetCardService();
  }

  async setCards(req, res) {

    try {
      const cards = await this.setCardService.setCards(req, res);
      return res.json(cards);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}

module.exports = SetCardController;