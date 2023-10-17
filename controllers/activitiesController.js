const { assignDueDateQuery  , markActivitiesQuery ,completionPercentage, getActivitiesQuery , setActivitiesRequiredQuery } = require("../models/activitiesModel.js");



const assignDueDateController = async (req, res) => {
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
// Activities can be marked as ‘not required’
const markActivitiesController = async (req, res) => {
    try {
        const { activity_id } = req.body;
        const markActivities = await markActivitiesQuery([activity_id]);
        return res.json(markActivities);
    } catch (error) {
        console.error("Error markActivitiesController file:", error);
        res.status(500).send("Internal Server Error");
    }
}

// 
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
}

const getActivitiesController = async(req, res)=>{
    try {
        const getActivity = await getActivitiesQuery();
        return res.json(getActivity);
    } catch (error) {
        console.error("Error completion percentage controller file:", error);
        res.status(500).send("Internal Server Error");
    }
}

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
}

module.exports = { assignDueDateController , markActivitiesController , completionPercentageController , getActivitiesController , setActivitiesRequiredController };
