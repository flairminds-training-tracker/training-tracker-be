const {saveTpModel, getTrainingActModel} = require('../models/trainingPlanModel')
const saveTpCtrl = async(req, res)=>{
    try {
        const results = await saveTpModel(req.body, req.user.user_id)
        if (results.success) {
            return res.send(results);
        } else {
            return res.send({
                error: true,
                errorMessage: results.errorMessage
            })
        }
    } catch (error) {
        console.error("Error completion percentage controller file:", error);
        res.status(500).send("Internal Server Error");
    }
}
const getTrainingActCtrl = async(req, res) =>{
    try {
        //const {user_id} = req.body;
        const results = await getTrainingActModel(req.user.user_id)
        return res.send(results);

    } catch (error) {
        console.error("Error completion percentage controller file:", error);
        res.status(500).send("Internal Server Error");        
    }
}
const updateTrainingActCtrl = async(req,res) =>{
    try {
        
    } catch (error) {
        console.error("Error completion percentage controller file:", error);
        res.status(500).send("Internal Server Error");  
    }
}
module.exports = {saveTpCtrl, getTrainingActCtrl, updateTrainingActCtrl}