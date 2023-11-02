const express = require("express");
const { getActivitiesByTechnologyCtrl  } =require('../controllers/activitiesController');
const { adminAuthMiddleware } = require("../middlewares/adminMiddleware");


const activitiesRouter = express.Router();
activitiesRouter.use(adminAuthMiddleware)
// 6 . Get Activities API - Admin Page 
activitiesRouter.post('/getActivities', getActivitiesByTechnologyCtrl);

module.exports = {activitiesRouter};
