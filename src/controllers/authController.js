const { generateToken } = require('../jwt');
require = ('dotenv/config');

class AuthController {
  async login(req, res, pool) { 
    const { login, password } = req.body;

    try {
      const result = await pool.query('SELECT * FROM users WHERE login = $1 AND pass = $2', [login, password]);

      if (result.rows.length === 0) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      const user = result.rows[0];
      const tokenData = {
        cli_host: process.env.HOST || 'localhost',
        cli_user: process.env.USUARIO,
        port: process.env.PORT || 3337,
        password: process.env.PASSWORD,
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
