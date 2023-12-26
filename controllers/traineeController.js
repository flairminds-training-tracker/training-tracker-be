const {getTrainee , getTraineeDetailsQuery, markAsReviewedQuery, getTraineesDetailsForStatusQuery, getStatusDropdownQuery} = require('../models/traineeModel.js');
const {executeQuery} = require('../db_config/db_schema.js')

// 5 . Get Trainee & Trainer Dropdown - Admin Page
const getTraineeCtrl = async(_ , res) =>{
    try {
        const results = await getTrainee();
        if (!results.error) {
            return res.send(results);
        }
        return res.send({error: true, errorMessage: results.errorMessage})
    } catch (error) {
        console.error("Error in get Trainee Ctrl..:", error);
        res.status(500).send("Internal Server Error");
    }
}
// 9 .Mark As Reviewed tab - Trainees Page 
const markAsReviewedCtrl = async(req , res)=>{
    try {
        const results = markAsReviewedQuery(req.body.training_plan_id);
        if (!results.error) {
            return res.send(results);
        }
        return res.send({error: true, errorMessage: results.errorMessage}) 
    } catch (error) {
        console.error("Error in markAsReviewedCtrlr..:", error);
        res.status(500).send("Internal Server Error"); 
    }
}
// 14 . View Status for trainee - Training Page 
const getTraineesDetailsForStatusCtrl = async(req, res)=>{
    try {
        const results = await getTraineesDetailsForStatusQuery(req.params);
        if (!results.error) {
            return res.send(results);
        }
        return res.send({error: true, errorMessage: error.message})
    } catch (error) {
        console.error("Error in view Status Ctrl :", error);
        res.status(500).send("Internal Server Error"); 
    }
}
// 11 . Trainee Details which are active or old - Trainees Page  
const getActiveOrNotCtrl = async (req, res) => {
    try {
        const selectQuery = `SELECT * FROM users WHERE is_admin = 1 AND user_id = ? `;
        let user_id = req.user.user_id;
        const adminExists =  await executeQuery(selectQuery, user_id);
        if(adminExists.length > 0){
            user_id = null;
        }       
        const results = await getTraineeDetailsQuery([req.query.activityType , user_id]);
        if (!results.error) {
            return res.send(results);
        }
        return res.send({ error: true, errorMessage: results.errorMessage });
    } catch (error) {
        console.error("Error in get Trainee details Ctrl..:", error);
        res.status(500).send("Internal Server Error");
    }
}

// 12 . Status Dropdown for Edit Activity - Training Page - Only 3 options  
const getStatusDropdownCtrl = async(req , res)=>{
    try {
        const results = await getStatusDropdownQuery();
        if (!results.error) {
            return res.send(results);
        }
        return res.send({error: true, errorMessage: results.errorMessage})
    } catch (error) {
        console.error("Error in get Status Dropdown Ctrl..:", error);
        res.status(500).send("Internal Server Error");
    }
}
module.exports = {getTraineeCtrl  , getActiveOrNotCtrl , markAsReviewedCtrl , getTraineesDetailsForStatusCtrl , getStatusDropdownCtrl ,  getActiveOrNotCtrl};
