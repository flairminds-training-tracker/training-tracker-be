const express = require("express");
const { saveTpCtrl, getTrainingActCtrl, updateTrainingActCtrl} =require('../controllers/trainingPlanCtlr');
const { adminAuthMiddleware } = require("../middlewares/adminMiddleware");
const {userAuthMiddleware} = require("../middlewares/userMiddleware")

const trainingPlanRouter = express.Router();

trainingPlanRouter.post('/saveActivities',adminAuthMiddleware, saveTpCtrl);
trainingPlanRouter.post('/getTrainingActivities',userAuthMiddleware, getTrainingActCtrl);
trainingPlanRouter.post('/updateTrainingPlan',userAuthMiddleware, updateTrainingActCtrl)
module.exports = {trainingPlanRouter};