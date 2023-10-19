const {getTrainee, getStatusQuery , getTraineeDetailsQuery} = require('../models/traineeModel.js');

const getTraineeController = async(req , res) =>{
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
        const results = await getTraineeDetailsQuery();
        return res.send(results);
    }catch(error){
        console.error("Error in get Trainee controller..:", error);
        res.status(500).send("Internal Server Error");
    }
}

const getStatusController = async (req , res)=>{
    try {
        const results = await getStatusQuery();
        return res.send(results);
    } catch (error) {
        console.error("Error in get Status controller..:", error);
        res.status(500).send("Internal Server Error");
    }
}
// Get all the details of trainee like Name of trainee, trained by, activities information, completion percentage, start and end date
const getActiveOrNotController = async (req, res)=>{
    try {
        const results = await getTraineeDetailsQuery();
        return res.send(results);
    } catch (error) {
        console.error("Error in get Trainee details controller..:", error);
        res.status(500).send("Internal Server Error"); 
    }
}
module.exports = {getTraineeController  , getTraineeDetailsController , getStatusController , getActiveOrNotController};