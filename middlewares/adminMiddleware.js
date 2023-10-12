const { executeQuery } = require("../db_config/db_schema");

const checkUserAuth = async (req, res, next) => {
    let token;    
    if (user && user.is_admin) { 
        const { authorization } = req.headers;
        if (authorization == null) {
            return res.status(401).send({ "status": "failed", "message": "Unauthorized User, No Token" });
        }
        if (authorization && authorization.startsWith('Bearer')) {
            try {
                // Get Token from header
                token = authorization.split(' ')[1];
                // Verify Token
                const email = jwt.verify(token, process.env.JWT_SECRET_KEY);
                const selectQuery = `SELECT * FROM User WHERE is_admin = 1 AND email = ? `;
                const user = await executeQuery(selectQuery ,email);
                console.log("a", email);
          next();
        } catch (error) {
          console.log(error.message);
          res.status(401).send({ "status": "failed", "message": "Unauthorized User" });
        }
      } else if (!token) {
        res.status(401).send({ "status": "failed", "message": "Unauthorized User, No Token" });
      }
    } else {
      res.status(401).send({ "status": "failed", "message": "You don't have admin rights, No Token can be given" });
    }
  };
  
  
module.exports = {checkUserAuth};