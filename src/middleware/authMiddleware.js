const jwt = require("jsonwebtoken");
// require = "dotenv/config";
const { createConnectionByAccessKey } = require("./apiKeyMiddleware");

async function authenticateToken(req, res, next) {
  const token = req.header("Authorization");
  const accessKey = req.header("ApiAccessKey");

  if (!token && !accessKey) {
    return res.status(401).json({ message: "Autenticação não fornecido" });
  }

  if (accessKey) {
    const apiKeyReturn = await createConnectionByAccessKey(accessKey);
    if(apiKeyReturn['dbname'] != null){
      req.user = {database: apiKeyReturn['dbname']};
      next();
    }else{
      return res.status(403).json({ message: apiKeyReturn['message'] });
    }

  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Autenticação inválida" });
      }

      req.user = user;
      next();
    });
  }
}

module.exports = {
  authenticateToken,
};
