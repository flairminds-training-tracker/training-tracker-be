const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { addUserQuery, userExists } = require("../models/userModel.js");
const {executeQuery} = require('../db_config/db_schema.js');

// 1 . add user API - Admin Page 
const addUser = async (req, res) => {
    let { user_name, email, password, is_admin } = req.body;

    if (!(user_name && email && password)) {
        return res.send("All fields are necessary...");
    } 
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const userExist = await userExists(email); 
        if (userExist.length > 0) {
            return res.status(400).json({ error: "Email already exists. Choose a different email address or login with the same address." });
            }
        const now = new Date();
        if(!is_admin) is_admin = 0; 
        const results = await addUserQuery(user_name, email, hashPassword, is_admin , now);
        if(results.length == 0){
            return res.status(400).json({ error: "Something wrong in your code" });
        }
        const token = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY, {
            expiresIn: "5d",
        });
        res.send({success : true, message :`User created successfully with email - ${email} and has ${token}`});
    } catch (error) {
        res.send("Unable to register");
        console.error(error);
    }
};
// 2 . user login API - Admin Page 
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const selectQuery = `SELECT * FROM users WHERE email = ?`;
            const result = await executeQuery(selectQuery, email);
            if (result.length == 0) {
                return res.status(400).json({error: `You're not registered yet. Please first sign up and you'll be able to log in.`, });
            }
            const isMatch = await bcrypt.compare(password, result[0].password);
            if (result[0].email === email && isMatch) {
                const user_id = result[0].user_id;
                const token = jwt.sign({ email: email,user_id:user_id }, process.env.JWT_SECRET_KEY, {
                    expiresIn: "5d",
                })
                res.cookie('access_token', token);
                return res.send({"token":token,"success":true,"user_id":user_id,"is_admin": result[0].is_admin});
                } else {
                    return res.send(`Invalid email or password...`);
                }
        } else {
            return res.send({success : false, message :"All fields are necessary..."});
        }
    } catch (error) {
        console.log(error);
        return res.send(error);
    }
};

module.exports = { addUser , userLogin };
