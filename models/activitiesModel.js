const { executeQuery } = require("../db_config/db_schema.js");

// 6 . Get Activities API - Admin Page 
const getActivitiesByTechnologyQuery = async(params)=>{
    try {
        const {tech_id} = params;
        const selectQuery = `SELECT tm.tech_id , tm.technology AS technology,ttm.tech_topic_id , ttm.topic AS topic, tst.tech_sub_topic_id , tst.sub_topic AS sub_topic,
        am.activity_id , am.activity AS activity
        FROM technologies_master tm LEFT JOIN tech_topics_master 
        ttm ON tm.tech_id = ttm.tech_id
        LEFT JOIN tech_sub_topics_master tst ON ttm.tech_topic_id = tst.tech_topic_id LEFT JOIN activities_master am ON tst.tech_sub_topic_id = am.sub_topic_id WHERE tm.tech_id = ? AND am.activity_id is NOT NULL `;
        return executeQuery(selectQuery ,tech_id);
    } catch (error) {
        console.log("Error in the activities model query");
        throw error;
    }
}

const setStatusEditActivityQuery =async()=>{
    try {
        const selectQuery = `SELECT status_id FROM status_master sm  WHERE status IN ('not_started','in_progress','done');`
        return executeQuery(selectQuery)
    } catch (error) {
        console.log("Error in the set Status activities query");
        throw error;
    }
}

module.exports = { getActivitiesByTechnologyQuery, setStatusEditActivityQuery }
