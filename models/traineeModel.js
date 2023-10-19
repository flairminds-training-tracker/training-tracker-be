const {executeQuery} = require('../db_config/db_schema.js');

// get Trainer and trainee dropdown
const getTrainee =() => {
    const query = `SELECT user_id , user_name FROM user WHERE is_admin = 0`;
    return executeQuery(query);
}

const getStatusQuery = () =>{
    const query = `SELECT status_id , status FROM status_master`
    return executeQuery(query);
}
// Get all the details of trainee like Name of trainee, trained by, activities information, completion percentage, start and end date
const getTraineeDetailsQuery = ()=>{
    const query = `SELECT 
    u1.user_name as trainee_name,
    2.user_name as trained_by,
    COUNT(CASE WHEN c.is_resolved = false THEN 1 ELSE NULL END) as unresolved_comments,
    COUNT(CASE WHEN tp.status_id = 1 THEN 1 ELSE NULL END) as unreviewed_status,
    COUNT(CASE WHEN tp.status_id = 6 THEN 1 ELSE NULL END) as activities_not_started,
    COUNT(CASE WHEN tp.status_id = 5 THEN 1 ELSE NULL END) as delayed_activities,
    COUNT(CASE WHEN tp.status_id = 2 THEN 1 ELSE NULL END) / COUNT(*) * 100 as Completed_Activities_Percentage,
    tech.technology as technology,
    MAX(tp.due_date) as last_due_Date
FROM 
    trainee_trainer_tech ttt
JOIN 
    user u1 ON ttt.trainee_id = u1.user_id
JOIN 
    user u2 ON ttt.trainer_id = u2.user_id
JOIN 
    technologies_master tech ON ttt.tech_id = tech.tech_id
LEFT JOIN 
    training_plan tp ON ttt.ttt_id = tp.ttt_id
LEFT JOIN 
    comments c ON tp.training_plan_id = c.training_plan_id
GROUP BY 
    u1.user_name, u2.user_name, tech.technology;`;
    return executeQuery(query)
}
module.exports = {getTrainee , getStatusQuery , getTraineeDetailsQuery};
