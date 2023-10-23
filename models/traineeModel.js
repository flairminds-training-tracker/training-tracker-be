const {executeQuery} = require('../db_config/db_schema.js');

// get Trainer and trainee dropdown
const getTrainee =() => {
    const query = `SELECT user_id , user_name FROM users WHERE is_admin = 0`;
    return executeQuery(query);
}

const getStatusQuery = () =>{
    const query = `SELECT status_id , status FROM status_master`
    return executeQuery(query);
}
// Get all the details of trainee like Name of trainee, trained by, activities information, completion percentage, start and end date
const getTraineeDetailsQuery = (params)=>{
    let whereCondition = ''
    if (params.activityType == 'active') {
        whereCondition = `WHERE Completed_Activities_Percentage != 100`
    } else if (params.activityType == 'old') {
        whereCondition = `WHERE Completed_Activities_Percentage = 100`
    }
    const getOldAndActiveActivitiesQuery = `WITH cte AS (SELECT 
        ttt.trainee_id as trainee_name,
        ttt.trainer_id as trained_by,
        COUNT(CASE WHEN c.is_resolved = false THEN 1 ELSE NULL END) as unresolved_comments,
        COUNT(CASE WHEN tp.status_id = 1 THEN 1 ELSE NULL END) as unreviewed_status,
        COUNT(CASE WHEN tp.status_id = 6 THEN 1 ELSE NULL END) as activities_not_started,
        COUNT(CASE WHEN tp.status_id = 5 THEN 1 ELSE NULL END) as delayed_activities,
        COUNT(CASE WHEN tp.status_id = 2 THEN 1 ELSE NULL END) / COUNT(*) * 100 as Completed_Activities_Percentage,
        tech.technology as technology,
        MAX(tp.due_date) as last_due_Date
    FROM trainee_trainer_tech ttt
    JOIN users u1 ON ttt.trainee_id = u1.user_id
    JOIN users u2 ON ttt.trainer_id = u2.user_id
    JOIN technologies_master tech ON ttt.tech_id = tech.tech_id
    LEFT JOIN training_plan tp ON ttt.ttt_id = tp.ttt_id
    LEFT JOIN comments c ON tp.training_plan_id = c.training_plan_id
    GROUP BY u1.user_name, u2.user_name, tech.technology)
    SELECT * FROM cte ${whereCondition}`;
    return executeQuery(getOldAndActiveActivitiesQuery , params)
}

// update the activity for a particular user and activity 
const updateActivityForUserQuery = (param) =>{
    const {user_id , activity_id , start_date , end_date , due_date} = param; 
    const updateQuery = `UPDATE training_plan tp
    JOIN trainee_trainer_tech ttt ON tp.ttt_id = ttt.ttt_id
    SET tp.start_date = ?,
        tp.end_date = ?
    WHERE tp.activity_id = ?
      AND ttt.trainee_id = ?;
    `;
    const params = [start_date , end_date ,due_date ,activity_id , user_id ];
    return executeQuery(updateQuery , params)
}

module.exports = {getTrainee , getStatusQuery , getTraineeDetailsQuery , updateActivityForUserQuery};
