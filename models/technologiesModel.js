const { executeQuery } = require("../db_config/db_schema.js");

// 4 .Get Technology Dropdown - Admin Page
const getTechnology = async() =>{
    const query = `SELECT tech_id , technology FROM technologies_master`
    return await executeQuery(query);
}
// My training part for dashboard page 
const getMyTrainingQuery = async([user_id]) => {
    let query = `WITH cte AS ( SELECT  t.technology,
            SUM(CASE WHEN tp.status_id = (SELECT status_id FROM status_master WHERE status = 'completed') THEN 1 ELSE 0 END) AS completed,
            SUM(CASE WHEN tp.status_id = (SELECT status_id FROM status_master WHERE status = 'in_progress') THEN 1 ELSE 0 END) AS in_progress,
            SUM(CASE WHEN tp.status_id = (SELECT status_id FROM status_master WHERE status = 'not_started') THEN 1 ELSE 0 END) AS not_started,
            SUM(CASE WHEN tp.status_id = (SELECT status_id FROM status_master WHERE status = 'done') THEN 1 ELSE 0 END) AS not_reviewed,
            SUM(CASE WHEN tp.status_id = (SELECT status_id FROM status_master WHERE status = 'delayed') THEN 1 ELSE 0 END) AS delayed_,
            (SUM(CASE WHEN tp.status_id = (SELECT status_id FROM status_master WHERE status = 'completed') THEN 1 ELSE 0 END) / COUNT(*)) * 100 AS percentage_of_activities
        FROM trainee_trainer_tech ttt
        JOIN technologies_master t ON ttt.tech_id = t.tech_id
        JOIN training_plan tp ON ttt.ttt_id = tp.ttt_id
        WHERE ttt.trainee_id = ? 
        GROUP BY t.technology
    )
    SELECT technology, completed, in_progress, not_started, delayed_, not_reviewed, percentage_of_activities FROM cte;
    `;
        return await executeQuery(query, [user_id]);
}

// all trinees under perticular trainer
const traineesDashboardQuery = (params)=>{
    const query = ` SELECT
    SUM(CASE WHEN tp.status_id = (SELECT status_id FROM status_master WHERE status='completed') THEN 1 ELSE 0 END) AS completed,
    SUM(CASE WHEN tp.status_id = (SELECT status_id FROM status_master WHERE status='in_progress') THEN 1 ELSE 0 END) AS in_progress,
    SUM(CASE WHEN tp.status_id = (SELECT status_id FROM status_master WHERE status='not_started') THEN 1 ELSE 0 END) AS not_started,
    SUM(CASE WHEN tp.status_id = (SELECT status_id FROM status_master WHERE status='delayed') THEN 1 ELSE 0 END) AS delayed_,
    SUM(CASE WHEN tp.status_id = (SELECT status_id FROM status_master WHERE status='done') THEN 1 ELSE 0 END) AS not_reviewed
FROM technologies_master t
    JOIN trainee_trainer_tech ttt ON t.tech_id = ttt.tech_id
    JOIN training_plan tp ON ttt.ttt_id = tp.ttt_id
WHERE ttt.trainer_id = ?;`;
    return executeQuery(query , params);
}

module.exports = { getTechnology , getMyTrainingQuery ,  traineesDashboardQuery  };
 