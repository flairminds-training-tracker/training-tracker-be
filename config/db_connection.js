const path = require('path');
// const { con } = require('../utils/exec_db_query');
// let dbCon = false
const mysql = require("mysql2");
require('dotenv').config({ path: path.resolve('../.env') });
const con = mysql.createConnection({
  connectionLimit: 10,
  host: `${process.env.HOST}`,
  user: `${process.env.USER}`,
  password: `${process.env.PASSWORD}`,
  database: `${process.env.DATABASE}`,
  port: `${process.env.DATABASE_PORT}`,
  multipleStatements: true
});

// Attempt to connect
con.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.info('Connected to MySQL');
});

module.exports = { con };
