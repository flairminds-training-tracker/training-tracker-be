const express = require("express");
const { assignDueDateController, markActivitiesController, completionPercentageController  , getActivitiesByTechnologyController, setActivitiesRequiredController} =
 require('../controllers/activitiesController');
const { adminAuthMiddleware } = require("../middlewares/adminMiddleware");


const activitiesRouter = express.Router();
activitiesRouter.use(adminAuthMiddleware)
// activitiesRouter.put('/assignDueDate', assignDueDateController);
// activitiesRouter.put('/markRequired', markActivitiesController);
// activitiesRouter.get('/completionPercent/:trainee_id', completionPercentageController);
//activitiesRouter.put('/setNotRequired', setActivitiesRequiredController);

activitiesRouter.post('/getActivities', getActivitiesByTechnologyController);


module.exports = {activitiesRouter};
