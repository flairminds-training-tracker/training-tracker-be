const { assignDueDateQuery , markActivitiesQuery , completionPercentage , getActivitiesByTechnologyQuery , setActivitiesRequiredQuery , saveTpModel,getTrainingActModel } = require("../models/activitiesModel.js");

const assignDueDateController = async(req, res) => {
    try {
        const {due_date , activity_id} = req.body
        const activitiesData = [due_date , activity_id]  
        const activities = await assignDueDateQuery([due_date , activity_id]);        
        console.log(activities);
        res.json(activities);
    } catch (error) {
        console.error("Error in assigning a due date:", error);
        res.status(500).send("Internal Server Error");
    }
};
const markActivitiesController = async(req, res) => {
    try {
        const { activity_id } = req.body;
        const markActivities = await markActivitiesQuery([activity_id]);
        return res.json(markActivities);
    } catch (error) {
        console.error("Error markActivitiesController file:", error);
        res.status(500).send("Internal Server Error");
    }
};
const completionPercentageController = async(req , res)=>{
    try {
        const {trainee_id} = req.params ;
        const completionPercent = await completionPercentage([trainee_id]);
        console.log(completionPercent);
        return res.json(completionPercent);
    } catch (error) {
        console.error("Error completion percentage controller file:", error);
        res.status(500).send("Internal Server Error");
    }
};
const setActivitiesRequiredController = async(req, res)=>{
    try {
        const {activity_id} = req.body
        const setActivities = await setActivitiesRequiredQuery(activity_id);
        console.log(setActivities);
        return res.json(setActivities);
    } catch (error) {
        console.error("Error completion percentage controller file:", error);
        res.status(500).send("Internal Server Error");
    }
};
const getActivitiesByTechnologyController = async(req, res)=>{
    try {
        const {tech_id} = req.body;
        const params = [tech_id];
        const results = await getActivitiesByTechnologyQuery(params);
        return res.send(results);
        // console.log(results);
    } catch (error) {
        console.error("Error completion percentage controller file:", error);
        res.status(500).send("Internal Server Error"); 
    }
}


module.exports = { assignDueDateController , markActivitiesController , completionPercentageController , getActivitiesByTechnologyController , setActivitiesRequiredController  };

