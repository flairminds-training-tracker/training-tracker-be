let db_con = false
try {
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

  // Attempt to connect
  con.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL');
  });
  db_con = con
} catch (error) {
  console.error('Error setting up MySQL connection:', error);
}
module.exports = db_con;
