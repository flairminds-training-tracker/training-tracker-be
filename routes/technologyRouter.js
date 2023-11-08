const express = require("express");
const {getTechnologyCtrl , getMyTrainingCtrl, traineesDashboardCtrl } = require("../controllers/technologiesController.js");
const technologyRouter = express.Router();
const { adminAuthMiddleware } = require("../middlewares/adminMiddleware.js");
const { userAuthMiddleware } = require("../middlewares/userMiddleware.js");

// 4 .Get Technology Dropdown - Admin Page
technologyRouter.get('/', adminAuthMiddleware, getTechnologyCtrl);

// My training part for dashboard page 
technologyRouter.get('/myTraining' ,userAuthMiddleware, getMyTrainingCtrl) 
// technologyRouter.post('/myTraining' ,userAuthMiddleware, getMyTrainingCtrl) 

technologyRouter.get('/traineeDashboard',userAuthMiddleware , traineesDashboardCtrl);


module.exports = { technologyRouter };
