const { generateToken } = require('../jwt');
const AuthService = require('../services/authService');
require = ('dotenv/config');

class AuthController {
  constructor(pool) {
    this.authService = new AuthService(pool);
  }
  async login(req, res) { 
    try {
      
      const resultado = await this.authService.getAuth(req, res);

    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}

module.exports = AuthController;
