const {executeQuery} = require('../db_config/db_schema.js');


const addUserQuery = (user_name,email , password , is_admin , createdAt) => {
    const query = `INSERT INTO User (user_name, email, password, is_admin , created_at) VALUES (?, ?, ?, ? ,?)`;
    const params =  [user_name,email,password,is_admin , createdAt];
    return executeQuery(query , params);
}
const userExists = (email)=>{
    const query = `SELECT * FROM User WHERE email = ?`;
    const params = email;
    return executeQuery(query , params);
}

const updatePassword = async (newPasswordHash) =>{
    try {
        const query = 'UPDATE user SET password = ?';
        return executeQuery(query , [newPasswordHash]);
    } catch (error) {
        console.error('Error in updateUserPasswordByEmail:', error);
        throw error;
    }
}
// console.log("User model working fine");

module.exports = {addUserQuery , userExists , updatePassword };