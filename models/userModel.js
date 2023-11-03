const {executeQuery} = require('../db_config/db_schema.js');

// 1 . add user API - Admin Page 
const addUserQuery = (user_name,email , password , is_admin , createdAt) => {
    const query = `INSERT INTO users (user_name, email, password, is_admin , created_at) VALUES (?, ?, ?, ? ,?)`;
    const params =  [user_name,email,password,is_admin , createdAt];
    return executeQuery(query , params);
}
// 1 . add user API - Admin Page
const userExists = (email)=>{
    const query = `SELECT * FROM users WHERE email = ?`;
    const params = email;
    return executeQuery(query , params);
}

// console.log("User model working fine");

module.exports = {addUserQuery , userExists };