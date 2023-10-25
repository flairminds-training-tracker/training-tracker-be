const mysql = require("mysql");
require('dotenv').config();

const con = mysql.createConnection({
  connectionLimit: 10,
  host: `${process.env.HOST}`,
  user: `${process.env.USER}`,
  password: `${process.env.PASSWORD}`,
  database: `${process.env.DATABASE}`,
  port: `${process.env.DATABASE_PORT}`,
  multipleStatements: true,
});

module.exports = con;