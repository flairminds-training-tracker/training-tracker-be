const {getTraineeController, getTraineeDetailsController, getStatusController , getActiveOrNotController, updateActivityForUserController, markAsReviewedController, getTraineesDetailsForStatusCtrl, getStatusDropdownCtrl} = require('../controllers/traineeController.js')
const express = require("express");
const traineeRouter = express.Router();
const { adminAuthMiddleware } = require("../middlewares/adminMiddleware");
const {userAuthMiddleware} = require("../middlewares/userMiddleware")


traineeRouter.post('/',adminAuthMiddleware, getTraineeController);
traineeRouter.post('/traineeDetails',userAuthMiddleware, getTraineeDetailsController);
traineeRouter.post('/getStatus', userAuthMiddleware,getStatusController);
traineeRouter.post('/active' , userAuthMiddleware ,getActiveOrNotController )
traineeRouter.post('/markAsReviewed' ,userAuthMiddleware ,markAsReviewedController);
traineeRouter.get('/viewStatus/:status_id' ,getTraineesDetailsForStatusCtrl);
traineeRouter.get('/statusDropdown',getStatusDropdownCtrl);

// traineeRouter.get('/tech/:tech_id', );

module.exports = { traineeRouter };

