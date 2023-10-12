const express = require("express");
const {userRegistration , userLogin, changePassword} = require('../controllers/userController.js');
const { checkUserAuth } = require('../middlewares/adminMiddleware.js');
const userRouter = express.Router();

// public routes
userRouter.post('/register', userRegistration);
userRouter.post('/login', userLogin);

// protected routes
userRouter.post('/changePassword', changePassword , checkUserAuth);


module.exports = { userRouter };
