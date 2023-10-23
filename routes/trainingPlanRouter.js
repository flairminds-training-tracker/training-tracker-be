const express = require("express");
const { saveTpCtrl, getTrainingActCtrl} =require('../controllers/trainingPlanCtlr');
const { adminAuthMiddleware } = require("../middlewares/adminMiddleware");
const {userAuthMiddleware} = require("../middlewares/userMiddleware")

const trainingPlanRouter = express.Router();

trainingPlanRouter.post('/saveActivities',adminAuthMiddleware, saveTpCtrl);
trainingPlanRouter.post('/getTrainingActivities',userAuthMiddleware, getTrainingActCtrl);
module.exports = {trainingPlanRouter};