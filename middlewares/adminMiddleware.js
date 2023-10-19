const { executeQuery } = require("../db_config/db_schema");
const jwt = require('jsonwebtoken')

const checkUserAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  let token;

  if (authorization == null) {
      return res.status(401).send({ "status": "failed", "message": "Unauthorized User, No Token" });
  }
  token = authorization.split(' ')[1];

  try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const email = decodedToken.email;

      const selectQuery = `SELECT * FROM user WHERE is_admin = 1 AND email = ? `;
      const user = req.user = await executeQuery(selectQuery, email);

      if (user && user.is_admin !==0) {
          next();
      } else {
          res.status(401).send({ "status": "failed", "message": "You cannot change password since you don't have admin rights " });
      }
  } catch (error) {
      console.error('Error verifying token:', error);
      res.status(401).send({ "status": "failed", "message": "Unauthorized User" });
  }
};

  
module.exports = {checkUserAuth};