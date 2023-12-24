const jwt = require('jsonwebtoken');

function generateToken(data) {
  return jwt.sign(data, 'r@M!c#fl0res', { expiresIn: '1h' }); //COLOCAR A SECRET EM UM ARQUIVO .ENV
}

module.exports = {
  generateToken,
};