eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJyb2NrMDVAZ21haWwuY29tIiwiaWF0IjoxNjk2OTEzNTM0LCJleHAiOjE2OTczNDU1MzR9.dhEpU785IxRIWKbh0x0ImzT1sFee1k_zeK9nvuWhURg


// Data for user register
// {
//     "user_name" : "Brock lesnar"  ,
    //  "email" : "brock05@gmail.com",
    //  "password" : "brock@123",
//      "password_confirmation" : "brock@123",
//      "is_admin" : "1"
//  }

// Data for user login
// // { 
//     "email" : "swaraj@gmail.com",
//     "password" : "Swaraj@123"
// }

//   {
//     "trainee_id" : "1",
//     "trainer_id" : "2" ,
//     "tech_id" : "2",
//     "tech_topic_id" : "1",
//     "tech_sub_topic_id" : "1",
//     "activity_id" : "1",
//     "due_date" : "2023-10-11 14:30:00",
//     "start_date" : "2021-9-9 12:30:00",
//     "end_date" : "2023-12-12 16:30:00",
//     "status_id": "1",
//     "required" : "1",
// }

// {
//   "due_date": "2023-11-11 11:11:10",
//   "activity_id" : "1"
// }


const { executeQuery } = require("../db_config/db_schema.js");

// This is class based approach when you are importing the resources from other user 
class TechnologyModel {
  static async checkIfUserExists(user_id) {
    const [result] = await executeQuery('SELECT COUNT(*) as count FROM user WHERE user_id = ?', [user_id]);
    return result.count > 0;
  }

  static async checkIfTechTopicExists(tech_topic_id) {
    const [result] = await executeQuery('SELECT COUNT(*) AS count FROM tech_topics_master WHERE tech_topic_id = ? ', [tech_topic_id]);
    return result.count > 0;
  }

  static async checkIfSubTechExists(tech_sub_topic_id) {
    const [result] = await executeQuery('SELECT COUNT(*) AS count FROM tech_sub_topics_master WHERE tech_sub_topic_id = ?', [tech_sub_topic_id]);
    return result.count > 0;
  }

  static async checkIfStatusExists(status_id) {
    const [result] = await executeQuery('SELECT COUNT(*) AS count FROM activities_master WHERE activity_id =?', [status_id]);
    return result.count > 0;
  }

  static async checkIfActivityExists(activity_id) {
    const [result] = await executeQuery('SELECT COUNT(*) AS count FROM activities_master WHERE activity_id =?', [activity_id]);
    return result.count > 0;
  }

  static async checkIfTechExists(tech_id) {
    const [result] = await executeQuery('SELECT COUNT(*) as count FROM technologies_master WHERE tech_id = ?', [tech_id]);
    return result.count > 0;
  }

  static async beginTransaction() {
    return new Promise((resolve, reject) => {
      con.beginTransaction((err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }

  static async commitTransaction() {
    return new Promise((resolve, reject) => {
      con.commit((err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }

  static async rollbackTransaction(error) {
    return new Promise((resolve, reject) => {
      con.rollback(() => {
        reject(error);
      });
    });
  }

  static async assignTechnologyQuery(trainee_trainer_tech_table, training_plan_table) {
    try {
      // Begin the transaction
      await this.beginTransaction();

      // Insert the values into the trainee trainer tech
      const insertQuery = `INSERT INTO trainee_trainer_tech (trainee_id, trainer_id, tech_id, created_at) VALUES (?, ?, ?, NOW())`;
      const trainee_trainer_tech_results = await executeQuery(insertQuery, trainee_trainer_tech_table);
      if (trainee_trainer_tech_results.error) {
        await this.rollbackTransaction(trainee_trainer_tech_results.error);
        return Promise.reject(trainee_trainer_tech_results.error);
      }

      const insertTrainingPlan = `INSERT INTO training_plan  
        (ttt_id, activity_id, due_date, start_date, end_date, status_id, description, comment_id, trainer_comments, created_by, created_at, required, modified_by, modified_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

      const trainingPlanResult = await executeQuery(insertTrainingPlan, training_plan_table);
      if (trainingPlanResult.error) {
        await this.rollbackTransaction(trainingPlanResult.error);
        return Promise.reject(trainingPlanResult.error);
      }

      // Commit the transaction
      await this.commitTransaction();

      // Resolve the promise
      return "Data inserted successfully into both tables.";
    } catch (error) {
      console.error("Error in assignTechnologyQuery:", error);
      return Promise.reject(error);
    }
  }
}

module.exports = TechnologyModel;


// Important --to be used later
const getActivitiesQuery = async()=>{
  const selectQuery = `SELECT 
  ttt.trainee_id, 
  ttt.trainer_id, 
  ttt.tech_id, 
  tts.tech_topic_id, 
  tsts.tech_sub_topic_id, 
  am.activity_id, 
  tp.due_date, 
  tp.start_date, 
  tp.end_date, 
  sm.status_id, 
  tp.required
FROM 
  trainee_trainer_tech ttt
JOIN 
  tech_sub_topics_master tsts ON tsts.tech_topic_id = ttt.tech_id
JOIN 
  tech_topics_master tts ON tts.tech_topic_id = tsts.tech_topic_id
JOIN 
  activities_master am ON am.sub_topic_id = tsts.tech_sub_topic_id
JOIN 
  training_plan tp ON tp.ttt_id = ttt.ttt_id AND tp.activity_id = am.activity_id
JOIN 
  status_master sm ON sm.status_id = tp.status_id
WHERE 
  ttt.trainee_id = 1
  AND ttt.trainer_id = 2
  AND ttt.tech_id = 2
  AND tts.tech_topic_id = 1
  AND tsts.tech_sub_topic_id = 1
  AND am.activity_id = 1
  AND tp.due_date = '2023-10-11 14:30:00'
  AND tp.start_date = '2021-09-09 12:30:00'
  AND tp.end_date = '2023-12-12 16:30:00'
  AND sm.status_id = 1
  AND tp.required = 1;
`;
  const trainee_trainer_tech_results = await executeQuery(insertQuery);
  if (trainee_trainer_tech_results.error) {
      await rollbackTransaction(trainee_trainer_tech_results.error);
      throw trainee_trainer_tech_results.error; 
  }
}

// Punit sir login for JWT verification 
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlB1bml0QDEyM0BnbWFpbC5jb20iLCJpYXQiOjE2OTcxMDgzNTcsImV4cCI6MTY5NzU0MDM1N30.GliX6K6Qm4FOEdIMIyzs54F3HTyiB0GurzqfAFHJTNg

// Punit sir login demo 
// {
//   "current_password": "Omkar@123",
//   "password_confirmation" : "Omkar@123" , 
//   "new_password" : "Punit@Flairminds"
// }