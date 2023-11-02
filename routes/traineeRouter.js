const {getTraineeController, getTraineeDetailsController, getStatusController , getActiveOrNotController, updateActivityForUserController, markAsReviewedController, getTraineesDetailsForStatusCtrl, getStatusDropdownCtrl, getTrainerController} = require('../controllers/traineeController.js')
const express = require("express");
const traineeRouter = express.Router();
const { adminAuthMiddleware } = require("../middlewares/adminMiddleware");
const {userAuthMiddleware} = require("../middlewares/userMiddleware")


traineeRouter.get('/',adminAuthMiddleware, getTraineeController);
// Active and old completed 
traineeRouter.post('/traineeDetails',userAuthMiddleware, getTraineeDetailsController);
traineeRouter.get('/getStatus', userAuthMiddleware,getStatusController);
traineeRouter.post('/active' , userAuthMiddleware ,getActiveOrNotController )
traineeRouter.put('/markAsReviewed' ,userAuthMiddleware ,markAsReviewedController);
traineeRouter.get('/viewStatus/:status_id/:trainee_id' ,getTraineesDetailsForStatusCtrl);
traineeRouter.get('/statusDropdown',getStatusDropdownCtrl);

// traineeRouter.get('/tech/:tech_id', );

module.exports = { traineeRouter };

