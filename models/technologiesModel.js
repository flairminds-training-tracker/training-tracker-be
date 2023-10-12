const { executeQuery } = require("../db_config/db_schema.js");
const con = require('../db_config/db_connection.js');

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

const assignTechnologyQuery = async (trainee_trainer_tech_table, training_plan_table) => {
    try {
        await beginTransaction();

        const insertQuery = `INSERT INTO trainee_trainer_tech (trainee_id, trainer_id, tech_id, created_at) VALUES (?, ?, ?, NOW())`;
        const trainee_trainer_tech_results = await executeQuery(insertQuery, trainee_trainer_tech_table);
        if (trainee_trainer_tech_results.error) {
            await rollbackTransaction(trainee_trainer_tech_results.error);
            throw trainee_trainer_tech_results.error; 
        }

        const insertTrainingPlan = `INSERT INTO training_plan  
        (ttt_id, activity_id, due_date, start_date, end_date, status_id,  comment_id, created_by, created_at, required, modified_by, modified_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

        const trainingPlanResult = await executeQuery(insertTrainingPlan, training_plan_table);
        if (trainingPlanResult.error) {
            await rollbackTransaction(trainingPlanResult.error);
            throw trainingPlanResult.error; 
        }

        // Commit the transaction
        await commitTransaction();

        return "Data inserted successfully into both tables.";
    } catch (error) {
        console.error("Error in assignTechnologyQuery:", error);
        await rollbackTransaction(error); // Ensure rollback on any error
        throw error; // Re-throw error for higher level handling
    }
};

// const getActivitiesQuery = async()=>{
//     const selectQuery = ``;
//     const trainee_trainer_tech_results = await executeQuery(selectQuery);
//     if (trainee_trainer_tech_results.error) {
//         await rollbackTransaction(trainee_trainer_tech_results.error);
//         throw trainee_trainer_tech_results.error; 
//     }
// }

const getTechnology = () =>{
    const query = `SELECT tech_id , technology FROM technologies_master`
    return executeQuery(query);
}

module.exports = { assignTechnologyQuery , getTechnology };
