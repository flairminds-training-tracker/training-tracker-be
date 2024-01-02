// const CONFIG = require('../utils/config');

// let dbCon = false
// try {
//   const mysql = require("mysql2");
//   require('dotenv').config();

//   const con = mysql.createConnection({
//     connectionLimit: 10,
//     host: CONFIG.DB_HOST,
//     user: CONFIG.DB_USER,
//     password: CONFIG.DB_PASSWORD,
//     database: CONFIG.DB_DATABASE,
//     port: CONFIG.DB_PORT,
//     multipleStatements: true
//   });

//   // Attempt to connect
//   con.connect((err) => {
//     if (err) {
//       console.error('Error connecting to MySQL:', err);
//       return;
//     }
//     console.info('Connected to MySQL');
//   });
//   dbCon = con;
// } catch (error) {
//   console.error('Error setting up MySQL connection:', error);
// }
// module.exports = dbCon;
