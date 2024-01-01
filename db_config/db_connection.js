let dbCon = false
try {
  const mysql = require("mysql2");
  require('dotenv').config();

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
  dbCon = con;
} catch (error) {
  console.error('Error setting up MySQL connection:', error);
}
module.exports = dbCon;
