const { generateToken } = require('../jwt');
require = ('dotenv/config');
class AuthService {
    constructor(pool) {
        this.pool = pool;
    }

    async getAuth(req, res) {
        let client;
        try {
            const { login, password, manterLogin } = req.body;
            const result = await this.pool.query(`SELECT login, us_dbname, t.token_codigo 
                FROM users u 
                left outer join token_by_users t on(t.token_usuario = u.id) 
                WHERE login = $1 AND pass = $2`, [login, password]);
            client = await this.pool.connect();
            if (result.rows.length === 0) {
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }
            const user = result.rows[0];
            const tokenData = {
                cli_host: process.env.HOST || 'localhost',
                cli_user: process.env.USUARIO,
                port: process.env.PORT || 5006,
                password: process.env.PASSWORD,
                database: user.us_dbname,
            };
            const token = generateToken(tokenData);

            const apiAccessKey = manterLogin == 'S' ? user.token_codigo : null;

            return res.status(200).json({ 
                "user": user.login,
                "token": token,
                "apiAccessKey": apiAccessKey
            });

        } catch (error) {
            throw error;
        } finally {
            if (client) {
              client.release();
            }
          }
    }
}

module.exports = AuthService;