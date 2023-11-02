const express = require("express");
const {getTechnologyCtrl , getMyTrainingCtrl , allActivitiesSummationCtrl, traineesDashboardCtrl , completionPercentageCtrl} = require("../controllers/technologiesController.js");
const technologyRouter = express.Router();
const { adminAuthMiddleware } = require("../middlewares/adminMiddleware.js");
const { userAuthMiddleware } = require("../middlewares/userMiddleware.js");

// 4 .Get Technology Dropdown - Admin Page
technologyRouter.get('/', adminAuthMiddleware, getTechnologyCtrl);

// My training part for dashboard page 
technologyRouter.post('/myTraining' ,userAuthMiddleware, getMyTrainingCtrl) 
// technologyRouter.post('/myTraining' ,userAuthMiddleware, getMyTrainingCtrl) 


technologyRouter.get('/allActivitiesDashboard',userAuthMiddleware , allActivitiesSummationCtrl);

technologyRouter.get('/traineeDashboard',userAuthMiddleware , traineesDashboardCtrl);

technologyRouter.post('/completionPercentage',userAuthMiddleware , completionPercentageCtrl);

module.exports = { technologyRouter };
