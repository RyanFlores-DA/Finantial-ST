// src/controllers/authController.js
const { generateToken } = require('../jwt');

class AuthController {
  async login(req, res, pool) { // Certifique-se de receber a pool como parâmetro
    const { login, password } = req.body;

    try {
      const result = await pool.query('SELECT * FROM users WHERE login = $1 AND pass = $2', [login, password]);

      if (result.rows.length === 0) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      const user = result.rows[0];
      const tokenData = {
        cli_host: '191.252.204.101',
        cli_user: user.cli_user,
        port: 5432,
        password: user.password,
        database: user.us_dbname,
      };
      const token = generateToken(tokenData);

      return res.json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}

module.exports = AuthController;
