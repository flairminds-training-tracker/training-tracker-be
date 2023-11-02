const {executeQuery} = require('../db_config/db_schema.js');

// 5 . Get Trainee & Trainer Dropdown - Admin Page
const getTrainee =() => {
    const query = `SELECT user_id , user_name FROM users WHERE is_admin = 0`;
    return executeQuery(query);
}
// 8 .View Status Dropdown - Trainees Page - All 6 options 
const getStatusQuery = () =>{
    const query = `SELECT -1 as status_id, 'All' as status UNION ALL SELECT status_id, status FROM status_master`
    return executeQuery(query);
}
// 11 . Trainee Details which are active or old - Trainees Page  
const getTraineeDetailsQuery = ([activityType , user_id]) => {  
    const whereCondition = activityType === 'active'
        ? 'Completed_Activities_Percentage != 100'
        : activityType === 'old'
        ? 'Completed_Activities_Percentage = 100'
        : '';
    const getOldAndActiveActivitiesQuery = `
        SELECT 
            u1.user_name AS trainee_name, u2.user_name AS trainer_name, 
            tp.start_date, tp.end_date,
            SUM(CASE WHEN c.is_resolved = false THEN 1 ELSE NULL END) AS unresolved_comments,
            SUM(CASE WHEN tp.status_id = 1 THEN 1 ELSE 0 END) AS activities_not_started,
            SUM(CASE WHEN tp.status_id = 3 THEN 1 ELSE 0 END) AS unreviewed_status,
            SUM(CASE WHEN tp.status_id = 5 THEN 1 ELSE 0 END) AS delayed_activities,
            SUM(CASE WHEN tp.status_id = 4 THEN 1 ELSE 0 END) / COUNT(*) * 100 AS Completed_Activities_Percentage,   
            tech.technology AS technology,
            MAX(tp.due_date) AS last_due_Date
        FROM trainee_trainer_tech ttt
        JOIN users u1 ON ttt.trainee_id = u1.user_id
        JOIN users u2 ON ttt.trainer_id = u2.user_id
        JOIN technologies_master tech ON ttt.tech_id = tech.tech_id
        LEFT JOIN training_plan tp ON ttt.ttt_id = tp.ttt_id
        LEFT JOIN comments c ON tp.training_plan_id = c.training_plan_id
        ${!user_id ? '' : `WHERE u1.user_id = ?`}
        GROUP BY u1.user_name, u2.user_name, tech.technology
        HAVING ${whereCondition};
    `;
    return !user_id ? executeQuery(getOldAndActiveActivitiesQuery) : executeQuery(getOldAndActiveActivitiesQuery, [user_id]);
};

// 9 .Mark As Reviewed tab - Trainees Page 
const markAsReviewedQuery = (params)=>{
    const query = `UPDATE training_plan SET status_id = (select status_id from status_master where status='completed') WHERE training_plan_id = ? `;
    return executeQuery(query, params);
}

// 14 . View Status for trainee - Training Page 
const getTraineesDetailsForStatusQuery = (params) => {
    const queryParams = [params.status_id, params.trainee_id];
    let whereCondition = '';
    if(params){
        whereCondition = `WHERE sm.status_id = ? AND ttt.trainee_id = ?`;
    }
    const query = `
        SELECT tm.technology AS technology ,am.activity AS activity_name,
            tp.training_plan_id AS training_plan_id, ttm.topic AS topic,
            tst.sub_topic AS sub_topic,tp.due_date AS plan_due_date,
            am.description AS activity_description,tp.start_date AS plan_start_date,tp.end_date AS plan_end_date,
            c.comment AS comments,am.resource_link AS activity_link
        FROM 
            training_plan tp 
            JOIN status_master sm ON tp.status_id = sm.status_id
            JOIN activities_master am ON tp.activity_id = am.activity_id
            JOIN tech_sub_topics_master tst ON am.sub_topic_id = tst.tech_sub_topic_id
            JOIN tech_topics_master ttm ON tst.tech_topic_id = ttm.tech_topic_id 
            LEFT JOIN comments c ON tp.training_plan_id = c.training_plan_id
            LEFT JOIN trainee_trainer_tech ttt ON tp.ttt_id = ttt.ttt_id 
            LEFT JOIN technologies_master tm ON ttt.tech_id = tm.tech_id 
        ${whereCondition}  
        GROUP BY 
            am.activity_id, tp.due_date, c.comment_id
        ORDER BY 
            tp.due_date;
    `;
    return executeQuery(query, queryParams);
}

// 12 . Status Dropdown for Edit Activity - Training Page - Only 3 options  
const getStatusDropdownQuery = (params) =>{
    const query = `SELECT status_id , status_display FROM status_master WHERE status_id BETWEEN 1 AND 3`;
    return executeQuery(query, params);
}

module.exports = {getTrainee , getStatusQuery , getTraineeDetailsQuery ,  markAsReviewedQuery , getTraineesDetailsForStatusQuery ,  getStatusDropdownQuery};
