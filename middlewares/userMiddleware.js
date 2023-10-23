const { executeQuery } = require("../db_config/db_schema");
const jwt = require('jsonwebtoken')

const userAuthMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  let token;

  if (authorization == null) {
      return res.status(401).send({ "status": "failed", "message": "Unauthorized User, No Token" });
  }
  token = authorization.split(' ')[1];

  try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const email = decodedToken.email;

      const selectQuery = `SELECT * FROM users WHERE is_admin = 0 and email = ? `;
      const user = await executeQuery(selectQuery, email);
      req.user = user[0];
      if (user[0])  {
         next();
      } else {
          res.status(401).send({ "status": "failed", "message": "User not found" });
      }
  } catch (error) {
      console.error('Error verifying token:', error);
      res.status(401).send({ "status": "failed", "message": "Unauthorized User" });
  }
};

module.exports = { userAuthMiddleware };
