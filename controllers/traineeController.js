const {getTrainee, getStatusQuery , getTraineeDetailsQuery, updateActivityForUserQuery, markAsReviewedQuery, getTraineesDetailsForStatusQuery, getStatusDropdownQuery} = require('../models/traineeModel.js');
const {getTrainee, getStatusQuery , getTraineeDetailsQuery, updateActivityForUserQuery, markAsReviewedQuery, getTraineesDetailsForStatusQuery, getStatusDropdownQuery} = require('../models/traineeModel.js');
const { getActivitiesByTechnologyController } = require('./activitiesController.js');

const getTraineeController = async(_ , res) =>{
    try {
        const results = await getTrainee();
        return res.send(results);
    } catch (error) {
        console.error("Error in get Trainee controller..:", error);
        res.status(500).send("Internal Server Error");
    }
}
// Get all the details of trainee like Name of trainee, trained by, activities information, completion percentage, start and end date
const getTraineeDetailsController = async(req, res) =>{
    try{
        const results = await getTraineeDetailsQuery(req.params);
        return res.send(results);
    }catch(error){
        console.error("Error in get Trainee controller..:", error);
        res.status(500).send("Internal Server Error");
    }
}

const getStatusController = async (req , res)=>{
    try {
        const results = await getStatusQuery();
        if (results.success) {
            return res.send(results);
        }
        return res.send({error: true,errorMessage: results.errorMessage})
    } catch (error) {
        console.error("Error in get Status controller..:", error);
        res.status(500).send("Internal Server Error");
    }
}
const getActiveOrNotController = async (req, res)=>{
    try {
        let params = {
            activityType: req.query.activityType
        }
        const results = await getTraineeDetailsQuery(params);
        if (results.success) {
            return res.send(results);
        }
        return res.send({error: true,errorMessage: results.errorMessage})
    } catch (error) {
        console.error("Error in get Trainee details controller..:", error);
        res.status(500).send("Internal Server Error"); 
    }
}
const updateActivityForUserController = async(req , res)=>{
    try {
        const results = await updateActivityForUserQuery(req.body)
        if (results.success) {
            return res.send(results);
        }
        return res.send({error: true,errorMessage: results.errorMessage});
    } catch (error) {
        console.error("Error in get Trainee details controller..:", error);
        res.status(500).send("Internal Server Error"); 
    }
}

const markAsReviewedController = async(req , res)=>{
    try {
        const results = markAsReviewedQuery(req.body.training_plan_id);
        if (results.success) {
            return res.send(results);
        }
        return res.send({error: true,errorMessage: results.errorMessage}) 
    } catch (error) {
        console.error("Error in markAsReviewedControllerr..:", error);
        res.status(500).send("Internal Server Error"); 
    }
}

const getTraineesDetailsForStatusCtrl = async(req, res)=>{
    try {
        const results = await getTraineesDetailsForStatusQuery(req.params);
        if (results.success) {
            return res.send(results);
        }
        return res.send({error: true,errorMessage: results.errorMessage})
    } catch (error) {
        console.error("Error in view Status Controller :", error);
        res.status(500).send("Internal Server Error"); 
    }
}
const getStatusDropdownCtrl = async(req , res)=>{
    try {
        const results = await getStatusDropdownQuery();
        if (results.success) {
            return res.send(results);
        }
        return res.send({error: true,errorMessage: results.errorMessage})
    } catch (error) {
        console.error("Error in get Status Dropdown controller..:", error);
        res.status(500).send("Internal Server Error");
    }
}
module.exports = {getTraineeController  , getTraineeDetailsController , getStatusController , getActiveOrNotController , updateActivityForUserController , markAsReviewedController , getTraineesDetailsForStatusCtrl , getStatusDropdownCtrl};