const express = require("express");
const { assignDueDateController, markActivitiesController, completionPercentageController  , getActivitiesController, setActivitiesRequiredController} = require("../controllers/activitiesController");

const activitiesRouter = express.Router();

activitiesRouter.put('/assignDueDate', assignDueDateController);
activitiesRouter.put('/markRequired', markActivitiesController);
activitiesRouter.get('/completionPercent/:trainee_id', completionPercentageController);
activitiesRouter.get('/getActivities', getActivitiesController);
activitiesRouter.put('/setNotRequired', setActivitiesRequiredController);




module.exports = { activitiesRouter };
