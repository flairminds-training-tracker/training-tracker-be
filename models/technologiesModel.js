const { executeQuery } = require("../db_config/db_schema.js");

// 4 .Get Technology Dropdown - Admin Page
const getTechnology = () =>{
    const query = `SELECT tech_id , technology FROM technologies_master`
    return executeQuery(query);
}
// My training part for dashboard page 
const getMyTrainingQuery = ([user_id, tech_id]) => {
    let query = `
        SELECT t.technology,
            SUM(CASE WHEN tp.status_id = 4 THEN 1 ELSE 0 END) AS completed,
            SUM(CASE WHEN tp.status_id = 2 THEN 1 ELSE 0 END) AS in_progress,
            SUM(CASE WHEN tp.status_id = 1 THEN 1 ELSE 0 END) AS not_started,
            SUM(CASE WHEN tp.status_id = 5 THEN 1 ELSE 0 END) AS delayed_,
            (SUM(CASE WHEN tp.status_id = 4 THEN 1 ELSE 0 END) / COUNT(*)) * 100 AS percentage_of_activities
        FROM trainee_trainer_tech ttt
            JOIN technologies_master t ON ttt.tech_id = t.tech_id
            JOIN training_plan tp ON ttt.ttt_id = tp.ttt_id
        WHERE  ttt.trainee_id = ? GROUP BY t.technology`;
        return executeQuery(query, [user_id]);
}
// Working good - 
const allActivitiesSummationQuery = ()=>{
    const query = `SELECT
    SUM(CASE WHEN tp.status_id = 4 THEN 1 ELSE 0 END) AS completed,
    SUM(CASE WHEN tp.status_id = 2 THEN 1 ELSE 0 END) AS in_progress,
    SUM(CASE WHEN tp.status_id = 1 THEN 1 ELSE 0 END) AS not_started,
    SUM(CASE WHEN tp.status_id = 5 THEN 1 ELSE 0 END) AS delayed_,
    (SUM(CASE WHEN tp.status_id = 4 THEN 1 ELSE 0 END) / COUNT(*) * 100) AS completion_percentage
FROM
    technologies_master t
    LEFT JOIN trainee_trainer_tech ttt ON t.tech_id = ttt.tech_id
    LEFT JOIN training_plan tp ON ttt.ttt_id = tp.ttt_id;`;
    return executeQuery(query);
}

const traineesDashboardQuery = (params)=>{
    const query = `SELECT
    SUM(CASE WHEN tp.status_id = 4 THEN 1 ELSE 0 END) AS completed,
    SUM(CASE WHEN tp.status_id = 2 THEN 1 ELSE 0 END) AS in_progress,
    SUM(CASE WHEN tp.status_id = 1 THEN 1 ELSE 0 END) AS not_started,
    SUM(CASE WHEN tp.status_id = 5 THEN 1 ELSE 0 END) AS delayed_
FROM technologies_master t
    LEFT JOIN trainee_trainer_tech ttt ON t.tech_id = ttt.tech_id
    LEFT JOIN training_plan tp ON ttt.ttt_id = tp.ttt_id
WHERE ttt.trainer_id = ?;`;
    return executeQuery(query , params);
}

const completionPercentageQuery = ([user_id , tech_id])=>{
    const query = `SELECT
    (SUM(CASE WHEN tp.status_id = 4 THEN 1 ELSE 0 END) / COUNT(*)) * 100 AS percentage_of_completed_activities
    FROM trainee_trainer_tech ttt  JOIN technologies_master t ON ttt.tech_id = t.tech_id
    JOIN training_plan tp ON ttt.ttt_id = tp.ttt_id 
    WHERE  ttt.trainee_id = ? AND ttt.tech_id = ?;`;
    return executeQuery(query , [user_id , tech_id]);
}

module.exports = { getTechnology , getMyTrainingQuery , allActivitiesSummationQuery , traineesDashboardQuery , completionPercentageQuery };
 