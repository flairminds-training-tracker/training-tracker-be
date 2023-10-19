const con  = require('../db_config/db_connection.js')
const queries = [
  `CREATE TABLE IF NOT EXISTS user (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN NOT NULL DEFAULT 0 ,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS technologies_master (
    tech_id INT PRIMARY KEY AUTO_INCREMENT,
    technology VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS tech_topics_master (
    tech_topic_id INT PRIMARY KEY AUTO_INCREMENT,
    tech_id INT NOT NULL REFERENCES technologies_master(tech_id),
    topic VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS tech_sub_topics_master (
    tech_sub_topic_id INT PRIMARY KEY AUTO_INCREMENT,
    tech_topic_id INT NOT NULL REFERENCES tech_topics_master(tech_topic_id),
    sub_topic VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS activities_master (
    activity_id INT PRIMARY KEY AUTO_INCREMENT,
    sub_topic_id INT NOT NULL REFERENCES tech_sub_topics_master(tech_sub_topic_id),
    activity VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    resource_link VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS status_master (
    status_id INT PRIMARY KEY AUTO_INCREMENT,
    status VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS trainee_trainer_tech (
    ttt_id INT PRIMARY KEY AUTO_INCREMENT,
    trainee_id INT NOT NULL REFERENCES user(user_id),
    trainer_id INT NOT NULL REFERENCES user(user_id),
    tech_id INT NOT NULL REFERENCES technologies_master(tech_id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE TABLE IF NOT  EXISTS training_plan (
    training_plan_id INT PRIMARY KEY AUTO_INCREMENT,
    ttt_id INT NOT NULL REFERENCES trainee_trainer_tech(ttt_id),
    activity_id INT NOT NULL REFERENCES activities_master(activity_id),
    due_date TIMESTAMP NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    status_id INT NOT NULL REFERENCES status_master(status_id),
    created_by INT NOT NULL REFERENCES user(user_id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    required BOOLEAN NOT NULL DEFAULT TRUE,
    modified_by INT REFERENCES user(user_id),
    modified_at TIMESTAMP
  );
  
  CREATE TABLE IF NOT  EXISTS comments (
    comment_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL REFERENCES user(user_id),
    is_resolved BOOLEAN NOT NULL,
    comment TEXT NOT NULL,
    training_plan_id INT REFERENCES training_plan(training_plan_id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    resolved_on TIMESTAMP
  );  
  `,
];

try {
  con.query(queries.join(""), (error) => {
    if (error) throw error;
    // console.log("Schema created successfully");
  });
} catch (error) {
  if (error.code === "ER_BAD_DB_ERROR") {
    console.error("Database 'Training_Tracker' does not exist. Please create it.");
  } else {
    console.error(error);
  }
}
const executeQuery = (query,params = []) => {
  return new Promise((resolve, reject) => {
    con.query(query, params, (error, result) => {
      if (error) {
        console.log("The error is-",error);
        reject(error);
      } else {
        console.log(result);
        resolve(result);
      }
    });
  });
};
// console.log(" 2. db schema file working properly");
module.exports = {executeQuery , con};
