const { executeQuery } = require("../db_config/db_schema.js");
const {con} = require('../db_config/db_schema.js');
const beginTransaction = () => {
    return new Promise((resolve, reject) => {
        con.beginTransaction((err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
};
const commitTransaction = () => {
    return new Promise((resolve, reject) => {
        con.commit((err) => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
};
const rollbackTransaction = (error) => {
    return new Promise((resolve, reject) => {
        con.rollback(() => {
            reject(error);
        });
    });
};
// 7 .Save Training Plan - Admin Page 
const saveTpModel = async(params, user_id) => {
    try {
        await beginTransaction();
        const {tech_id , trainee_id , trainer_id, activities} = params;
        const paramsForTP = activities
        const paramsForTTT = [tech_id , trainee_id , trainer_id, user_id];
        const selectQuery = `SELECT * FROM trainee_trainer_tech WHERE tech_id = ? AND trainee_id = ? AND trainer_id = ?`
        const results  = await executeQuery(selectQuery, [tech_id , trainee_id , trainer_id]);
        if(results.length > 0){
            return "Already data has been saved.Add another data...";
        } 
        const insertQueryTTT = `INSERT INTO trainee_trainer_tech (tech_id, trainee_id, trainer_id, created_by) VALUES (?, ?, ?, ?)`;
        const traineeTrainerTechResults = await executeQuery(insertQueryTTT, paramsForTTT);
        if (traineeTrainerTechResults.error) {
            await rollbackTransaction(traineeTrainerTechResults.error);
            throw traineeTrainerTechResults.error; 
        }
        console.log("Inserted ttt data")
        const tttId = traineeTrainerTechResults.insertId
        console.log(tttId)
        
        const values = paramsForTP.map(param => [tttId, param.activity_id, param.due_date, param.required ? param.required : true ,1,user_id]);
        console.log("THE USER ID IS -->",user_id);
        
        const insertQuery = `INSERT INTO training_plan(ttt_id , activity_id, due_date, required, status_id, created_by) VALUES ?`;
        const trainingPlanResult  = await executeQuery(insertQuery, [values]);
        if (trainingPlanResult.error) {
            await rollbackTransaction(trainingPlanResult .error);
            throw trainingPlanResult .error; 
        }
        await commitTransaction();
        return {success: true,message: "Data inserted successfully into both tables."};
    } catch (error) {
        console.error("Error in saveTpModel:", error);
        await rollbackTransaction(error); 
        return {success: false,error: true,errorMessage: error.message}
    }
};
//13 . Update Training Plan - Training Page
const updateTrainingActModel= async(params,user_id) =>{
    try {

        await beginTransaction(); 
        const tpId = params.tpId  
      
        let setValues = []
        if (params.status_id) {
            setValues.push(`status_id = ${params.status_id}`)
        }
        if (params.start_date) {
            start_date = new Date(params.start_date).toISOString().slice(0, 19).replace('T', ' ');
            setValues.push(`start_date = '${start_date}'`)
            console.log(start_date)
        }
        if (params.end_date) {
            end_date = new Date(params.end_date).toISOString().slice(0, 19).replace('T', ' ');
            setValues.push(`end_date = '${end_date}'`)
        }
        if(setValues.length>0)
        {
            const paramsForUpdate = [user_id, tpId]
            const updateTrainingQuery = `update training_plan set ${setValues.join(',')}, modified_by = ?, modified_at = now() where training_plan_id = ?`;
            const update_results = await executeQuery(updateTrainingQuery,paramsForUpdate)
            if (update_results.error) {
                await rollbackTransaction(update_results.error);
                throw update_results.error; 
            }
        }
        if("comment" in params)
        {
            const comment = params.comment
            paramsForComment = [user_id,0,comment,tpId]
            const insertCommentQuery = `insert into comments(added_by,is_resolved,comment,training_plan_id) values(?,?,?,?)`;
            const insert_comment_results = await executeQuery(insertCommentQuery,paramsForComment)
            if (insert_comment_results.error) {
                await rollbackTransaction(insert_comment_results.error);
                throw insert_comment_results.error;
            }
        }
        await commitTransaction();
        return {success: true,message: "Update Operation Completed"};

    } catch (error) { 
        await rollbackTransaction(error); 
        return{ success: false,error: true,errorMessage: error.message}
    }
}
const updateCommentStatusModel= async(params) =>{
    try {
        const {comment_id}=params
        const updateCommentQuery = `update comments set is_resolved = 1,resolved_on=now() where comment_id = ?`
        
        const update_comment_status=executeQuery(updateCommentQuery,comment_id)
        if(update_comment_status.error){
            return {error: true,errorMessage:update_comment_status.error}
        }
        return {success: true, message: "Updated Comment Status"};
        
    } catch (error) {
        return {error: true,errorMessage: error.message}
    }
}
// 14 . My Activities -Training Page 
const getTrainingActModel = async(params) => {
    try {
        let selectQuery = `SELECT tp.training_plan_id, 
            tm.technology AS tech,am.activity AS activity_name, ttm.topic AS topic_name,tst.sub_topic AS sub_topic_name , 
            tp.start_date AS start_date, tp.due_date AS due_date,
            tp.end_date AS end_date, c.comment AS comments,
            am.resource_link AS resource_link, am.description AS activity_description, 
            sm.status AS status_name 
        FROM 
            training_plan AS tp 
            INNER JOIN activities_master AS am ON tp.activity_id = am.activity_id 
            INNER JOIN tech_sub_topics_master AS tst ON am.sub_topic_id = tst.tech_sub_topic_id 
            INNER JOIN tech_topics_master AS ttm ON tst.tech_topic_id = ttm.tech_topic_id
            INNER JOIN technologies_master AS tm ON ttm.tech_id = tm.tech_id
            LEFT JOIN comments AS c ON tp.training_plan_id = c.training_plan_id
            INNER JOIN status_master AS sm ON tp.status_id = sm.status_id
            INNER JOIN trainee_trainer_tech AS ttt ON tp.ttt_id = ttt.ttt_id
            INNER JOIN users AS u ON ttt.trainee_id = u.user_id
        WHERE 
            ttt.trainee_id = ?`;

        console.log(params);
        if (params.length > 1 && params[1] !== -1) {
            selectQuery += ` AND tp.status_id = ?`;
        }

        const trainingActResults = await executeQuery(selectQuery, params);

        if (trainingActResults.error) {
            return {error: true, errorMessage: trainingActResults.error}
        }

        return trainingActResults;

    } catch (error) {
        return {success: false, error: true, errorMessage: error.message}
    }
}

module.exports = {saveTpModel,  updateTrainingActModel, updateCommentStatusModel , getTrainingActModel}