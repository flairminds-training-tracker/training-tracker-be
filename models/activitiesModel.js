const { executeQuery } = require("../db_config/db_schema.js");
const {con} = require('../db_config/db_schema.js')

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
const completionPercentage = async(trainee_id)=>{
    try {
        const percentageQuery = `SELECT
        u.user_id,
        u.user_name,
        COUNT(tp.training_plan_id) AS total_activities,
        SUM(tp.required) AS completed_activities,
        (SUM(tp.required) / COUNT(tp.training_plan_id)) * 100 AS completion_percentage
      FROM
        users u
      INNER JOIN
        trainee_trainer_tech ttt ON u.user_id = ttt.trainee_id
        INNER JOIN
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
const getActivitiesByTechnologyQuery = async(params)=>{
    try {
        const selectQuery = `SELECT tm.tech_id , 
        tm.technology AS technology,
        ttm.tech_topic_id , 
        ttm.topic AS topic,
        tst.tech_sub_topic_id , 
        tst.sub_topic AS sub_topic,
        am.activity_id , 
        am.activity AS activity
        FROM
        technologies_master tm
        LEFT JOIN
        tech_topics_master ttm ON tm.tech_id = ttm.tech_id
        LEFT JOIN
        tech_sub_topics_master tst ON ttm.tech_topic_id = tst.tech_topic_id
        LEFT JOIN
        activities_master am ON tst.tech_sub_topic_id = am.sub_topic_id
        WHERE tm.tech_id = ? AND am.activity_id is NOT NULL 
        `
        ;
        return executeQuery(selectQuery ,params);
    } catch (error) {
        console.log("Error in the activities model query");
        throw error;
    }
}


module.exports = { assignDueDateQuery , markActivitiesQuery , completionPercentage , getActivitiesByTechnologyQuery , setActivitiesRequiredQuery }
