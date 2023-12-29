const { generateToken } = require('../jwt');
require = ('dotenv/config');
class AuthService {
    constructor(pool) {
        this.pool = pool;
    }

    async getAuth(req, res) {
        try {
            const { login, password } = req.query;
            const result = await this.pool.query('SELECT login, us_dbname FROM users WHERE login = $1 AND pass = $2', [login, password]);

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

            return res.status(200).json({ 
                "user": user.login,
                "token": token
            });

        } catch (error) {
            throw error;
        }
    }
}

module.exports = AuthService;