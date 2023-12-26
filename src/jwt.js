const jwt = require('jsonwebtoken');
require = ('dotenv/config');

function generateToken(data) {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' }); //COLOCAR A SECRET EM UM ARQUIVO .ENV
}

module.exports = {
  generateToken,
};