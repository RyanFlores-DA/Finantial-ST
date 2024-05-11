const jwt = require('jsonwebtoken');
require = ('dotenv/config');

function generateToken(data) {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '12h' });
}

module.exports = {
  generateToken,
};