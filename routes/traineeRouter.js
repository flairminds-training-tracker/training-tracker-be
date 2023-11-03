const {getTraineeCtrl  ,getStatusCtrl , getActiveOrNotCtrl,  markAsReviewedCtrl , getTraineesDetailsForStatusCtrl , getStatusDropdownCtrl, getActiveOrNotCtrlLAST} =  require('../controllers/traineeController.js') 
const express = require("express");
const traineeRouter = express.Router();
const { adminAuthMiddleware } = require("../middlewares/adminMiddleware");
const {userAuthMiddleware} = require("../middlewares/userMiddleware")

// 5 . Get Trainee & Trainer Dropdown - Admin Page
traineeRouter.get('/',adminAuthMiddleware, getTraineeCtrl);

// 11 . Trainee Details which are active or old - Trainees Page  
traineeRouter.post('/activeTraineesAdmin', adminAuthMiddleware, getActiveOrNotCtrl);
traineeRouter.post('/activeTraineesUser', userAuthMiddleware, getActiveOrNotCtrl);

// 8 .View Status Dropdown - Trainees Page - All 6 options
traineeRouter.get('/getStatus', userAuthMiddleware,getStatusCtrl);

// 9 .Mark As Reviewed tab - Trainees Page 
traineeRouter.put('/markAsReviewed' ,userAuthMiddleware ,markAsReviewedCtrl);

// 12 . Status Dropdown for Edit Activity - Training Page - Only 3 options  
traineeRouter.post('/statusDropdown',userAuthMiddleware,getStatusDropdownCtrl);

module.exports = { traineeRouter };

