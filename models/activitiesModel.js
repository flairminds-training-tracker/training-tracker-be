const { executeQuery } = require("../db_config/db_schema.js");

const assignDueDateQuery = async (due_date , activity_id) => {
    try {
        const updateQuery = `UPDATE training_plan tp
                             JOIN activities_master am ON tp.activity_id = am.activity_id
                             SET tp.due_date = ?
                             WHERE tp.activity_id = ?`;
        return executeQuery(updateQuery, due_date ,activity_id );      
    } catch (error) {
        console.error("Error in assignDueDateQuery:", error);
        throw error;
    }
}
// Activities can be marked as ‘not required’
const markActivitiesQuery = async (activity_id) => {
    try {
        const updateQuery = `
            UPDATE training_plan tp
            JOIN activities_master am ON tp.activity_id = am.activity_id
            SET tp.required = false
            WHERE tp.activity_id = ?`;
        return executeQuery(updateQuery, activity_id);
    } catch (error) {
        console.log("Error in the activities model query");
        throw error;
    }
}
// View completion percentage
// Total completion percentage for each trainee

const completionPercentage = async(trainee_id)=>{
    try {
        const percentageQuery = `SELECT
        u.user_id,
        u.user_name,
        COUNT(tp.training_plan_id) AS total_activities,
        SUM(tp.required) AS completed_activities,
        (SUM(tp.required) / COUNT(tp.training_plan_id)) * 100 AS completion_percentage
      FROM
        user u
      LEFT JOIN
        trainee_trainer_tech ttt ON u.user_id = ttt.trainee_id
      LEFT JOIN
        training_plan tp ON ttt.ttt_id = tp.ttt_id
      WHERE u.user_id = ?
      GROUP BY
        u.user_id, u.user_name
      `
      return executeQuery(percentageQuery, trainee_id);
    } catch (error) {
        console.log("Error in the completion percentage query");
        throw error;
    }
}
const setActivitiesRequiredQuery = async (activity_id) => {
    try {
        const selectQuery = `
            UPDATE training_plan tp
            JOIN activities_master am ON tp.activity_id = am.activity_id
            SET tp.required = false
            WHERE tp.activity_id = ?`;
        return executeQuery(selectQuery, activity_id);
    } catch (error) {
        console.log("Error in the activities model query");
        throw error;
    }
}
const getActivitiesByTechnologyQuery = async()=>{
    const selectQuery = `SELECT
    ttt.trainee_id AS trainee_id,
    ttt.trainer_id AS trainer_id,
    ttt.tech_id,
    ttm.tech_topic_id AS topic_id,
    ttm.tech_topic_id,
    tst.tech_sub_topic_id AS sub_topic_id,
    tp.due_date,
    tp.required
  FROM
    user us
  LEFT JOIN trainee_trainer_tech ttt ON us.user_id = ttt.trainee_id
  LEFT JOIN technologies_master tm ON ttt.tech_id = tm.tech_id
  LEFT JOIN tech_topics_master ttm ON tm.tech_id = ttm.tech_id
  LEFT JOIN tech_sub_topics_master tst ON ttm.tech_topic_id = tst.tech_topic_id
  LEFT JOIN training_plan tp ON ttt.ttt_id = tp.ttt_id
  WHERE ttt.trainee_id = 3 AND
  ttt.trainer_id = 1  AND 
  ttt.tech_id = 1
`;
    return executeQuery(selectQuery);
}
// Check if all activities are already added




module.exports = { assignDueDateQuery , markActivitiesQuery , completionPercentage , getActivitiesByTechnologyQuery , setActivitiesRequiredQuery}
