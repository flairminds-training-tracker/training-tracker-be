const {executeQuery} = require('../db_config/db_schema.js');

// get Trainer and trainee dropdown
const getTrainee =() => {
    const query = `SELECT user_id , user_name FROM User WHERE is_admin = 0`;
    return executeQuery(query);
}

module.exports = {getTrainee};

