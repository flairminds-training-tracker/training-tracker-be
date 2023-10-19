const mysql = require("mysql");
require('dotenv').config();

const con = mysql.createConnection({
  connectionLimit: 10,
  host: "lifeactions.cp3m4vrc1c2y.ap-south-1.rds.amazonaws.com",
  user: "dev_lifeactions",
  password: "RmjDrgbRlwqdSPb3DDaf",
  database: "training_tracker_dev",
  port: 3306,
  multipleStatements: true,
});

module.exports = con;