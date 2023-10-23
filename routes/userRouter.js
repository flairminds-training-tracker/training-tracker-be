const express = require("express");
const {userRegistration , userLogin, changePassword, loggedUser, sendPasswordResetEmail, userPasswordReset} = require('../controllers/userController.js');
const { adminAuthMiddleware } = require('../middlewares/adminMiddleware.js');
const { userAuthMiddleware } = require("../middlewares/userMiddleware.js");
const userRouter = express.Router();

// public routes
userRouter.post('/addUser', userRegistration);
userRouter.post('/login', userLogin);
userRouter.post('/resetPasswordEmail', sendPasswordResetEmail);
userRouter.post('/resetPassword/:id/:token', userPasswordReset);
 
// protected routes
userRouter.post('/changePassword',changePassword );
userRouter.get('/loggedUser',userAuthMiddleware, loggedUser);


module.exports = { userRouter };
