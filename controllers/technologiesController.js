const { assignTechnologyQuery , getTechnology } = require('../models/technologiesModel.js');

const assignTechnology = async (req, res) => {
        return new Promise(async (resolve , reject) =>{
            try {
            const { trainee_id, trainer_id, tech_id, tech_topic_id, tech_sub_topic_id, activity_id, due_date , start_date , end_date, status_id, required,  created_by, modified_by , ttt_id , comment_id} = req.body;
    
            const techTopicExists = await checkIfTechTopicExists(tech_topic_id);
            const techSubTopicExists = await checkIfSubTechExists(tech_sub_topic_id);
            const traineeExists = await checkIfUserExists(trainee_id);
            const trainerExists = await checkIfUserExists(trainer_id);
            const techExists = await checkIfTechExists(tech_id);
            const activitiesExists = await checkIfActivityExists(activity_id);
            const statusExists = await checkIfStatusExists(status_id);
            const subTopicExists = await checkIfSubTechExists(tech_sub_topic_id);
    
    
            if (!traineeExists) {
                console.log(`Trainee with ID ${trainee_id} does not exist`);
            }
    
            if (!trainerExists) {
                console.log(`Trainer with ID ${trainer_id} does not exist`);
            }
    
            if (!techExists) {
                console.log(`Technology with ID ${tech_id} does not exist`);
            }
    
            if (!techTopicExists) {
                console.log(`Tech Topic with ID ${tech_topic_id} does not exist`);
            }
    
            if (!techSubTopicExists) {
                console.log(`Tech Sub Topic with ID ${tech_sub_topic_id} does not exist`);
            }
    
            if (!activitiesExists) {
                console.log(`Activity with ID ${activity_id} does not exist`);
            }
    
            if (!statusExists) {
                console.log(`Status with ID ${status_id} does not exist`);
            }
    
            if (!subTopicExists) {
                console.log(`Sub Topic with ID ${tech_sub_topic_id} does not exist`);
            }
    
            if (!traineeExists || !trainerExists || !techExists || !techTopicExists || !techSubTopicExists || !activitiesExists || !statusExists || !subTopicExists) {
                return res.status(400).json({ error: "Check data before applying" });
            }
            const now = new Date();
            const trainee_trainer_tech_table =[trainee_id ,trainer_id ,tech_id];
            const training_plan_table = [ttt_id , activity_id ,due_date ,start_date, end_date , status_id ,comment_id , created_by , now ,  required , modified_by , now];
            const results = await assignTechnologyQuery(trainee_trainer_tech_table, training_plan_table);
            if (results.error) {
                return res.send({error: true, message: results.error})
              }
            console.log("Technology assigned to the user");
            res.send("Technology assigned to the user");
        } catch (error) {
            console.error(error);
            res.status(500).send("Unable to register");
        }
        })
}

const getTechnologyController = async(req , res) =>{
    try {
        const results = await getTechnology();
        console.log(results);
        res.send(results);
    } catch (error) {
        console.error("Error in get technology controller..:", error);
        res.status(500).send("Internal Server Error");
    }
}
module.exports = { assignTechnology , getTechnologyController };
