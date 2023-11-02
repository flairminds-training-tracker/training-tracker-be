const { assignTechnologyQuery , getTechnology } = require('../models/technologiesModel.js');
     
const assignTechnology = async (req, res) => {
            try {
            const { trainee_id, trainer_id, tech_id, tech_topic_id, tech_sub_topic_id, activity_id, due_date , start_date , end_date, status_id, required,  created_by, modified_by , ttt_id , comment_id} = req.body;
            const now = new Date();
            const trainee_trainer_tech_table =[trainee_id ,trainer_id ,tech_id];
            const training_plan_table = [ttt_id , activity_id ,due_date ,start_date, end_date , status_id ,comment_id , created_by , now ,  required , modified_by , now];
            const results = await assignTechnologyQuery(trainee_trainer_tech_table, training_plan_table);
            if (results.success) {
                return res.send(results); 
            }
            return res.send({error: true,errorMessage: results.errorMessage})
        } catch (error) {
            console.error(error);
            res.status(500).send("Unable to register");
        }
}
const getTechnologyController = async(_ , res) =>{
    try {
        const results = await getTechnology();
        if (results.success) {
            return res.send(results);
        }
        return res.send({error: true,errorMessage: results.errorMessage})
    } catch (error) {
        console.error("Error in get technology controller..:", error);
        res.status(500).send("Internal Server Error");
    }
}
module.exports = { assignTechnology , getTechnologyController };
