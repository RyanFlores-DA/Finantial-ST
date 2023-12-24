const createPool = require('../db');

function dbMiddleware(req) {
//   if (req.path === '/login') {
//     // Se for a rota de login, não é necessário configurar a pool
//     return next();
//   }

//   const { database } = req.user.database;
  // Configurações específicas do banco de dados
  const dbConfig = {
    user: 'ryan',
    host: '191.252.204.101',
    database: `${req.user.database}`,
    password: '1234',
    port: 5432,
  };
  // Cria uma nova pool com as configurações específicas
  const pool = createPool(dbConfig);
//   return pool;
//   console.log('Middleware ' + pool);
  // Adiciona a pool e o nome do banco de dados à requisição
  return req.pool = pool;
//   req.database = database;

//   next();
}

module.exports = dbMiddleware;
