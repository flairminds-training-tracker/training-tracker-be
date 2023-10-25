const { updateTrainingActCtrl } = require("../controllers/trainingPlanCtlr.js");
const { executeQuery } = require("../db_config/db_schema.js");
const {con} = require('../db_config/db_schema.js')
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
const saveTpModel = async(params, user_id) => {
    try {
        await beginTransaction();
        const {tech_id , trainee_id , trainer_id, activities} = params;
        const paramsForTTT = [tech_id , trainee_id , trainer_id, user_id];
        const paramsForTP = activities
        const insertQueryTTT = `INSERT INTO trainee_trainer_tech (tech_id, trainee_id, trainer_id, created_by) VALUES (?, ?, ?,?)`;
        const trainee_trainer_tech_results = await executeQuery(insertQueryTTT, paramsForTTT);
        if (trainee_trainer_tech_results.error) {
            await rollbackTransaction(trainee_trainer_tech_results.error);
            throw trainee_trainer_tech_results.error; 
        }
        console.log("Inserted ttt data")
        const tttId = trainee_trainer_tech_results.insertId
        console.log(tttId)
        // const getTTTIdResult = await executeQuery(`SELECT ttt_id FROM trainee_trainer_tech ORDER BY created_at DESC LIMIT 1`);

        //const tttId = getTTTIdResult[0].ttt_id;

        const values = paramsForTP.map(param => [tttId, param.activity_id, param.due_date, param.required,1,user_id]);
        console.log("THE USER ID IS -->",user_id);
        
        const insertQuery = `INSERT INTO training_plan(ttt_id , activity_id, due_date, required, status_id, created_by) VALUES ?`;
        const tp_results = await executeQuery(insertQuery, [values]);
        await commitTransaction();

        return {
            success: true,
            message: "Data inserted successfully into both tables."
        };
    } catch (error) {
        //console.error("Error in assignTechnologyQuery:", error);
        await rollbackTransaction(error); 
        return {
            success: false,
            error: true,
            errorMessage: error.message
        }
    }
};

const getTrainingActModel= async(params) =>{
    try {
        console.log(params)
        const selectQuery = ` SELECT  
        technologies_master.technology AS technology,
        activities_master.activity AS activity_name,
        tech_topics_master.topic AS topic,
        tech_sub_topics_master.sub_topic AS sub_topic,
        training_plan.start_date AS start_date,
        training_plan.due_date AS due_date,
        training_plan.end_date AS end_date,
        comments.comment AS comments,
        activities_master.resource_link AS resource_link,
        activities_master.description AS description,
        status_master.status AS status
        FROM training_plan
        INNER JOIN activities_master ON training_plan.activity_id = activities_master.activity_id
        INNER JOIN tech_sub_topics_master ON activities_master.sub_topic_id = tech_sub_topics_master.tech_sub_topic_id
        INNER JOIN tech_topics_master ON tech_sub_topics_master.tech_topic_id = tech_topics_master.tech_topic_id
        INNER JOIN technologies_master ON tech_topics_master.tech_id = technologies_master.tech_id
        LEFT JOIN comments ON training_plan.training_plan_id = comments.training_plan_id
        INNER JOIN status_master ON training_plan.status_id = status_master.status_id
        INNER JOIN trainee_trainer_tech ON training_plan.ttt_id = trainee_trainer_tech.ttt_id
        INNER JOIN users ON trainee_trainer_tech.trainee_id = users.user_id
        WHERE trainee_trainer_tech.trainee_id = ? `;
        return executeQuery(selectQuery ,params);

    } catch (error) {
        console.log("Error in the activities model query");
        throw error;
    }

}
const updateTrainingActModel= async(params,user_id) =>{
    try {

        await beginTransaction(); 
        const tp_id = params.tp_id  
        // const selectData = `select start_date, end_date, status_id from training_plan WHERE training_plan_id = ?`;       
        // const tp_results = await executeQuery(selectData,tp_id)

        // let status_id = tp_results[0].status_id
        // let start_date = tp_results[0].start_date
        // let end_date = tp_results[0].end_date
        let setValues = []
        if (params.status_id) {
            setValues.push(`status_id = ${params.status_id}`)
        }
        if (params.start_date) {
            setValues.push(`start_date = ${params.start_date}`)
        }
        if (params.end_date) {
            setValues.push(`end_date = ${params.end_date}`)
        }
        console.log(setValues)
        // if (tp_results.error) {
        //     await rollbackTransaction(tp_results.error);
        //     throw tp_results.error; 
        // }
        // if("status_id" in params)
        // {
        //     status_id = params.status_id
        //     console.log(status_id)
        // }
        // if("start_date" in params)
        // {
        //     start_date = params.start_date
        // }
        // if("end_date" in params)
        // {
        //     end_date = params.end_date
        // }


        const paramsForUpdate = [user_id, tp_id]
        const updateTrainingQuery = `update training_plan set ${setValues.join(',')}, modified_by = ?, modified_at = now() where training_plan_id = ?`;
        const update_results = await executeQuery(updateTrainingQuery,paramsForUpdate)
        if (update_results.error) {
            await rollbackTransaction(update_results.error);
            throw update_results.error; 
        }
        if("comment" in params)
        {
            const comment = params.comment
            paramsForComment = [user_id,0,comment,tp_id]
            const insertCommentQuery = `insert into comments(added_by,is_resolved,comment,training_plan_id) values(?,?,?,?)`;
            const insert_comment_results = await executeQuery(insertCommentQuery,paramsForComment)
            if (insert_comment_results.error) {
                await rollbackTransaction(insert_comment_results.error);
                throw insert_comment_results.error;
            }
        }
        await commitTransaction();
        return {
            success: true,
            message: "Update Operation Completed"
        };

    } catch (error) { 
        await rollbackTransaction(error); 
        return {
            success: false,
            error: true,
            errorMessage: error.message
        }
    }

}
const updateCommentStatusModel= async(params) =>{
    try {
        const {comment_id}=params
        const updateCommentQuery = `update comments set is_resolved = 1,resolved_on=now() where comment_id = ?`
        
        const update_comment_status=executeQuery(updateCommentQuery,comment_id)
        if(update_comment_status.error)
        {
            return {
                errorMessage:update_comment_status.error
            }
        }
        return {
            success: true,
            message: "Updated Comment Status "
        };
        
    } catch (error) {
        return {
            success: false,
            error: true,
            errorMessage: error.message
        }
        
    }
}

module.exports = {saveTpModel, getTrainingActModel, updateTrainingActModel, updateCommentStatusModel}