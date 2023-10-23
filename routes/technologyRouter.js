const express = require("express");
const { assignTechnology } = require("../controllers/technologiesController.js");
const {getTechnologyController} = require('../controllers/technologiesController.js');
const technologyRouter = express.Router();
const { adminAuthMiddleware } = require("../middlewares/adminMiddleware");

//technologyRouter.post('/createTrainingPlan', assignTechnology);
technologyRouter.post('/', adminAuthMiddleware, getTechnologyController);


module.exports = { technologyRouter };
