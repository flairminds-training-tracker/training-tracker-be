const {saveTpModel, updateTrainingActModel, updateCommentStatusModel , getTrainingActModel} = require('../models/trainingPlanModel')
// 7 .Save Training Plan For Admin Page
const saveTpCtrl = async(req, res)=>{
    try {
        const results = await saveTpModel(req.body, req.user.user_id)
        if (!results.error) {
            return res.send(results);
        }
        return res.send({error: true, errorMessage: error.errorMessage})
    } catch (error) {
        console.error("Exception in save training plan controller", error);
        res.status(500).send("Internal Server Error");
    } 
}
// 13 . Update Training Plan - Training Page
const updateTrainingActCtrl = async(req,res) =>{
    try {
        const results = await updateTrainingActModel(req.body,req.user.user_id)
        if (!results.error) {
            return res.send(results);
        }
        return res.send({error: true, errorMessage: results.errorMessage})
    } catch (error) {
        console.error("Exception in update training plan controller", error);
        res.status(500).send("Internal Server Error");  
    }
}

const updateCommentStatusCtrl = async(req,res) =>{
    try {
        const results = await updateCommentStatusModel(req.body)
        if (!results.error) {
            return res.send(results);
        }
        return res.send({error: true, errorMessage: results.errorMessage})
    } catch (error) {
        console.error("Exception in update comment status controller", error);
        res.status(500).send("Internal Server Error");  
    } 
}

// 14 . My Activities -Training Page 
const getTrainingActCtrl = async (req, res) => {
    try {
        const results = await getTrainingActModel([req.user.user_id, req.body.status_id]);
        if (results.error) {
            return res.send({ error: true, errorMessage: results.errorMessage });
        }
        const formattedData = {};
        for (const row of results) {
            const { tech, topic_name, sub_topic_name, activity_name, start_date, due_date, end_date, comments, resource_link, activity_description, status_name } = row;
            if (!formattedData[tech]) {
                formattedData[tech] = [];
            }
            formattedData[tech].push({
                activity_name,topic_name,sub_topic_name,start_date, due_date, end_date,comments,resource_link,               activity_description,status_name
            });
        }
        return res.send(formattedData);
    } catch (error) {
        console.error("Exception in get training activities controller", error);
        res.status(500).send("Internal Server Error");
    }
}
module.exports = {saveTpCtrl,  updateTrainingActCtrl, updateCommentStatusCtrl , getTrainingActCtrl}