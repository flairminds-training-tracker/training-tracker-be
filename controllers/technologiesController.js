const {  getTechnology, getMyTrainingQuery , allActivitiesSummationQuery , traineesDashboardQuery , completionPercentageQuery} = require('../models/technologiesModel.js');

// 4 .Get Technology Dropdown - Admin Page
const getTechnologyCtrl = async(_ , res) =>{
    try {
        const results = await getTechnology();
        if (!results.error) {
            return res.send(results);
        }
        return res.send({error: true,errorMessage: results.errorMessage})
    } catch (error) {
        console.error("Error in get technology Ctrl..:", error);
        res.status(500).send("Internal Server Error");
    }
}
// My training part for dashboard page 
const getMyTrainingCtrl = async(req , res)=>{
    try {
        const results =  await getMyTrainingQuery([req.user.user_id]);
        if (!results.error) {
            let tempResults = results;

            let totalCompleted = 0;
            let totalInProgress = 0;
            let totalNotStarted = 0;
            let totalDelayed = 0;

            tempResults.forEach((result) => {
                totalCompleted += result.completed;
                totalInProgress += result.in_progress;
                totalNotStarted += result.not_started;
                totalDelayed += result.delayed_;
            });

            const allObject = {
                technology: 'All',
                completed: totalCompleted,
                in_progress: totalInProgress,
                not_started: totalNotStarted,
                delayed_: totalDelayed,
                percentage_of_activities: 0 
            };
            tempResults.push(allObject);
            return res.send(tempResults);
        }
        return res.send({error: true,errorMessage: results.errorMessage})
    } catch (error) {
        console.error("Error in Get My training plan..:", error);
        res.status(500).send("Internal Server Error");
    }
}
const allActivitiesSummationCtrl = async(req , res)=>{
    try {
        const results = await allActivitiesSummationQuery();
        if (!results.error) {
            return res.send(tempResults);
        }
        return res.send({error: true,errorMessage: results.errorMessage})
    } catch (error) {
        console.error("Error in Get allActivitiesSummationCtrl ..:", error);
        res.status(500).send("Internal Server Error");
    }
}
const traineesDashboardCtrl = async(req , res) =>{
    try {
        const results = await traineesDashboardQuery(req.user.user_id);
        if (!results.error) {
            return res.send(results);
        }
        return res.send({error: true,errorMessage: results.errorMessage})
    } catch (error) {
        console.error("Error in Get traineesDashboardCtrl ..:", error);
        res.status(500).send("Internal Server Error");
    }
}

const completionPercentageCtrl = async(req , res)=>{
    try {
        const results = await completionPercentageQuery([req.user.user_id , req.body.tech_id]); 
        if (!results.error) {
            return res.send(results);
        }
        return res.send({error: true,errorMessage: results.errorMessage})
    } catch (error) {
        console.error("Error in Get traineesDashboardCtrl ..:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { getTechnologyCtrl  , getMyTrainingCtrl , allActivitiesSummationCtrl , traineesDashboardCtrl , completionPercentageCtrl};
