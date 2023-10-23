const {getTraineeController, getTraineeDetailsController, getStatusController , getActiveOrNotController, updateActivityForUserController} = require('../controllers/traineeController.js')
const express = require("express");
const traineeRouter = express.Router();

// public routes
traineeRouter.post('/', getTraineeController);
traineeRouter.post('/traineeDetails', getTraineeDetailsController);
traineeRouter.post('/getStatus', getStatusController);
traineeRouter.post('/active' ,getActiveOrNotController )
traineeRouter.post('/updateActivityForUser' , updateActivityForUserController)


// traineeRouter.get('/tech/:tech_id', );

module.exports = { traineeRouter };
