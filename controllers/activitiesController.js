const { getActivitiesByTechnologyQuery , setStatusEditActivityQuery} = require("../models/activitiesModel.js");
const logger = require('../logger/logger.js');

// 6 . Get Activities API - Admin Page 
const getActivitiesByTechnologyCtrl = async(req, res)=>{
    try {
        const results = await getActivitiesByTechnologyQuery(req.body);
        if (!results.error) {
            return res.send(results);
        }
        return res.send({error: true, errorMessage: results.errorMessage})
    } catch (error) {
        console.error("Error completion percentage Ctrl file:", error);
        res.status(500).send("Internal Server Error"); 
    }
}
const setStatusForEditActivityCtrl = async(req , res)=>{
    try {
        const results = await setStatusEditActivityQuery();
        if (!results.error) {
            return res.send(results);
        }
        return res.send({error: true, errorMessage: results.errorMessage})
    } catch (error) {
        console.error("Error in setStatusForEditActivityCtrl  file:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {  getActivitiesByTechnologyCtrl , setStatusForEditActivityCtrl };

