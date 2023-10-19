const express = require("express");
const {userRegistration , userLogin, changePassword, loggedUser, sendPasswordResetEmail, userPasswordReset} = require('../controllers/userController.js');
const { checkUserAuth } = require('../middlewares/adminMiddleware.js');
const userRouter = express.Router();

// public routes
userRouter.post('/addUser', userRegistration);
userRouter.post('/login', userLogin);
// userRouter.post('/resetPasswordEmail', sendPasswordResetEmail);
// userRouter.post('/resetPassword/:id/:token', userPasswordReset);


// protected routes
userRouter.post('/changePassword',checkUserAuth , changePassword );
userRouter.get('/loggedUser', checkUserAuth , loggedUser);



module.exports = { userRouter };
