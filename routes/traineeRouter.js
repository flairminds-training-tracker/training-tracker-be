const {getTraineeController} = require('../controllers/traineeController.js')
const express = require("express");
const traineeRouter = express.Router();

// public routes
traineeRouter.get('/', getTraineeController);
// traineeRouter.get('/tech/:tech_id', );

module.exports = { traineeRouter };
