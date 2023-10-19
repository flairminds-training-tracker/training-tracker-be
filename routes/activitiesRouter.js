const express = require("express");
const { assignDueDateController, markActivitiesController, completionPercentageController  , getActivitiesByTechnologyController, setActivitiesRequiredController, saveActivitiesController} =
 require('../controllers/activitiesController');

const activitiesRouter = express.Router();

activitiesRouter.put('/assignDueDate', assignDueDateController);
activitiesRouter.put('/markRequired', markActivitiesController);
activitiesRouter.get('/completionPercent/:trainee_id', completionPercentageController);
activitiesRouter.post('/getActivities', getActivitiesByTechnologyController);
activitiesRouter.post('/saveActivities', saveActivitiesController);
// activitiesRouter.post('/saveActivities', saveActivitiesController);

activitiesRouter.put('/setNotRequired', setActivitiesRequiredController);

module.exports = {activitiesRouter};

// module.exports = { activitiesRouter };
