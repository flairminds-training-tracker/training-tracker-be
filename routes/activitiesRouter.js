const express = require("express");
const { assignDueDateController, markActivitiesController, completionPercentageController  , getActivitiesController} = require("../controllers/activitiesController");

const activitiesRouter = express.Router();

activitiesRouter.put('/assignDueDate', assignDueDateController);
activitiesRouter.put('/markRequired', markActivitiesController);
activitiesRouter.get('/completionPercent/:trainee_id', completionPercentageController);
activitiesRouter.get('/getActivities', getActivitiesController);



module.exports = { activitiesRouter };
