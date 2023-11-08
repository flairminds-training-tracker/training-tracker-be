const express = require("express");
const { getActivitiesByTechnologyCtrl , setStatusForEditActivityCtrl } =require('../controllers/activitiesController');
const { adminAuthMiddleware } = require("../middlewares/adminMiddleware");
const {userAuthMiddleware} = require('../middlewares/userMiddleware.js')

const activitiesRouter = express.Router();
// activitiesRouter.use()
// 6 . Get Activities API - Admin Page 
activitiesRouter.post('/getActivities',adminAuthMiddleware, getActivitiesByTechnologyCtrl);

activitiesRouter.get('/setStatus',userAuthMiddleware,setStatusForEditActivityCtrl)

module.exports = {activitiesRouter};
