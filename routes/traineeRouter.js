const {getTraineeCtrl  , getActiveOrNotCtrl,  markAsReviewedCtrl  , getStatusDropdownCtrl , getAllStatusCtrl} =  require('../controllers/traineeController.js') 
const express = require("express");
const traineeRouter = express.Router();
const { adminAuthMiddleware } = require("../middlewares/adminMiddleware.js");
const {userAuthMiddleware} = require("../middlewares/userMiddleware.js")

// 5 . Get Trainee & Trainer Dropdown - Admin Page
traineeRouter.get('/',adminAuthMiddleware, getTraineeCtrl);

// 11 . Trainee Details which are active or old - Trainees Page  
traineeRouter.get('/activeTraineesAdmin', adminAuthMiddleware, getActiveOrNotCtrl);
traineeRouter.get('/activeTraineesUser', userAuthMiddleware, getActiveOrNotCtrl);


// 9 .Mark As Reviewed tab - Trainees Page 
traineeRouter.put('/markAsReviewed' ,userAuthMiddleware ,markAsReviewedCtrl);

traineeRouter.get('/getStatus' ,userAuthMiddleware ,getAllStatusCtrl);

// 12 . Status Dropdown for Edit Activity - Training Page - Only 3 options  
traineeRouter.get('/statusDropdown',userAuthMiddleware,getStatusDropdownCtrl);

module.exports = { traineeRouter };

