const express = require("express");
const {addUser, userLogin} = require('../controllers/userController.js');
const { adminAuthMiddleware } = require('../middlewares/adminMiddleware.js');
const userRouter = express.Router();

// public routes
// 1 . add user API - Admin Page 
userRouter.post('/addUser', adminAuthMiddleware, addUser);
// 2 . user login API - Admin Page 
userRouter.post('/login', userLogin);

userRouter.get('/',(req, res)=>{
    return res.send("Welcome to training tracker backend...");
})

module.exports = { userRouter };
