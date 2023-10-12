const mysql = require("mysql");
require('dotenv').config();

const con = mysql.createConnection({
  connectionLimit: 10,
  host: "localhost",
  user: "Omkar",
  password: "Omkar@123",
  database: "Training_Tracker",
  multipleStatements: true,
});

module.exports = con;