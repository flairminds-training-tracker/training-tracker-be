const express = require("express");
const { assignTechnology } = require("../controllers/technologiesController.js");
const {getTechnologyController} = require('../controllers/technologiesController.js');
const technologyRouter = express.Router();

// public routes
technologyRouter.post('/createTrainingPlan', assignTechnology);
technologyRouter.post('/', getTechnologyController);


module.exports = { technologyRouter };
