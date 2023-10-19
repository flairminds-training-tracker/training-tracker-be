const { executeQuery } = require("../db_config/db_schema.js");

// Get technologies dropdown
const getTechnology = () =>{
    const query = `SELECT tech_id , technology FROM technologies_master`
    return executeQuery(query);
}

module.exports = {  getTechnology };
