const express = require("express");
const { assignTechnology } = require("../controllers/technologiesController.js");
const {getTechnologyController} = require('../controllers/technologiesController.js');
const technologyRouter = express.Router();
const { adminAuthMiddleware } = require("../middlewares/adminMiddleware");

//technologyRouter.post('/createTrainingPlan', assignTechnology);
technologyRouter.get('/', adminAuthMiddleware, getTechnologyController);


module.exports = { technologyRouter };
