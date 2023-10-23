const {getTraineeController, getTraineeDetailsController, getStatusController , getActiveOrNotController, updateActivityForUserController} = require('../controllers/traineeController.js')
const express = require("express");
const traineeRouter = express.Router();
const { adminAuthMiddleware } = require("../middlewares/adminMiddleware");
const {userAuthMiddleware} = require("../middlewares/userMiddleware")


traineeRouter.post('/',adminAuthMiddleware, getTraineeController);
traineeRouter.post('/traineeDetails',userAuthMiddleware, getTraineeDetailsController);
traineeRouter.post('/getStatus', userAuthMiddleware,getStatusController);
traineeRouter.post('/active' , userAuthMiddleware ,getActiveOrNotController )


// traineeRouter.get('/tech/:tech_id', );

module.exports = { traineeRouter };
