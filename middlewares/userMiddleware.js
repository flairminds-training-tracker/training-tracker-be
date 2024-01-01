const jwt = require('jsonwebtoken');
const { executeQuery } = require("../db_config/db_schema");
const {sendFailRes} = require('../utils/responses');

const userAuthMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
        if (authorization == null) {
        return sendFailRes(res, { message: "Unauthorized User, No Token" }, 401);
    }
    const token = authorization.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const email = decodedToken.email;

        const selectQuery = `SELECT * FROM users WHERE is_admin = 0 and email = ? `;
        const user = await executeQuery(selectQuery, email);
        req.user = user[0];
        if (user && req.user.is_admin === 0) {
            next();
        } else {
            return sendFailRes(res, { message: "User not found" }, 401);
        }
    } catch (error) {
        console.error('Error verifying token:', error);
        return sendFailRes(res, { message: "Unauthorized User" }, 401);
    }
};

module.exports = { userAuthMiddleware };