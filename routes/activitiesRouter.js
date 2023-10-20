const express = require("express");
const { assignDueDateController, markActivitiesController, completionPercentageController  , getActivitiesByTechnologyController, setActivitiesRequiredController, saveTpCtrl, getTrainingActCtrl} =
 require('../controllers/activitiesController');
const { checkUserAuth } = require("../middlewares/adminMiddleware");

const activitiesRouter = express.Router();
//activitiesRouter.use(checkUserAuth)
activitiesRouter.put('/assignDueDate', assignDueDateController);
activitiesRouter.put('/markRequired', markActivitiesController);
activitiesRouter.get('/completionPercent/:trainee_id', completionPercentageController);
activitiesRouter.post('/getActivities', getActivitiesByTechnologyController);
activitiesRouter.post('/saveActivities', saveTpCtrl);
activitiesRouter.post('/getTrainingActivities', getTrainingActCtrl);
// activitiesRouter.post('/saveActivities', saveActivitiesController);

activitiesRouter.put('/setNotRequired', setActivitiesRequiredController);
module.exports = {activitiesRouter};
