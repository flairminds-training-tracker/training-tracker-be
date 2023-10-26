const {saveTpModel, getTrainingActModel, updateTrainingActModel, updateCommentStatusModel} = require('../models/trainingPlanModel')
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
        console.error("Exception in save training plan controller", error);
        res.status(500).send("Internal Server Error");
    }
}
const getTrainingActCtrl = async(req, res) =>{
    try {
        //const {user_id} = req.body;
        const results = await getTrainingActModel(req.user.user_id)
        if(results.error)
        {
            return res.send({
                error:true,
                errorMessage:results.errorMessage
            })
        }
        else
        {
             return res.send(results)
        }

    } catch (error) {
        console.error("Exception in get training activities controller", error);
        res.status(500).send("Internal Server Error");        
    }
}
const updateTrainingActCtrl = async(req,res) =>{
    try {
        
        const results = await updateTrainingActModel(req.body,req.user.user_id)
        if (results.success)
        {
            return res.send(results.message);
        } 
        else 
        {
            return res.send({
                error: true,
                errorMessage: results.errorMessage
            })
        }
       // return res.send(results)

    } catch (error) {
        console.error("Exception in update training plan controller", error);
        res.status(500).send("Internal Server Error");  
    }
}
const updateCommentStatusCtrl = async(req,res) =>{
    try {
        const results = await updateCommentStatusModel(req.body)
        if (results.success)
        {
            return res.send(results.message);
        } 
        else
        {
            return res.send({
                error: true,
                errorMessage: results.errorMessage
            })
        }
    } catch (error) {
        console.error("Exception in update comment status controller", error);
        res.status(500).send("Internal Server Error");  
    }
   
}
module.exports = {saveTpCtrl, getTrainingActCtrl, updateTrainingActCtrl, updateCommentStatusCtrl}