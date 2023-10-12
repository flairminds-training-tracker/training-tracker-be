const { addUserQuery, userExists , updatePassword} = require("../models/userModel.js");
const {executeQuery} = require('../db_config/db_schema.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const userRegistration = async (req, res) => {
    const { user_name, email, password, is_admin } = req.body;

    if ( user_name , email && password && is_admin ) {
            try {
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(password, salt);
                const userExist = await userExists(email); 
                if (userExist.length > 0) {
            return res.status(400).json({ error: "Email already exists. Choose a different email address or login with the same address." });
          }
          const now = new Date();
          const results = await addUserQuery(user_name, email, hashPassword, is_admin , now);
          if(results.length == 0){
              return res.status(400).json({ error: "Something wrong in your code" });
            }
            const token = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY, {
                expiresIn: "5d",
            });
            res.send(`User created successfully with email - ${email} and has ${token}`);
        } catch (error) {
            res.send("Unable to register");
            console.error(error); // Use console.error for logging errors
        }
    }
 else {
    res.send("All fields are necessary...");
}
};

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
      const selectQuery = `SELECT * FROM user WHERE email = ?`;
      const result = await executeQuery(selectQuery, email);
      if (result.length == 0) {
        return res.status(400).json({error: `You're not registered yet. Please first sign up and you'll be able to log in.`, });
    }
    const isMatch = await bcrypt.compare(password, result[0].password);
    
    if (result[0].email === email && isMatch) {
        // Generate JWT token
        const token = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY, {
            expiresIn: "5d",
        });
        // res.send(token);
        return res.send("Login successful....");
        } else {
            return res.send(`Invalid email or password...`);
        }
    } else {
        return res.send("All fields are necessary...");
    }
    } catch (error) {
        console.log(error);
        return res.send(error);
    }
};

const changePassword = async (req, res ) =>{
    const { current_password , password_confirmation , new_password} = req.body ;
    console.log("Current Password -->",current_password);
    console.log("new  Password -->",new_password);

    if(current_password && password_confirmation && new_password){
        if(current_password !== password_confirmation){
            return res.send({"status":"Failed" ,"message" : "Password and confirm password should be same"});
        }
        try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(current_password , salt);
            await updatePassword(hashPassword); // Resolve the promise
            return res.send({"status":"Success" ,"message" : "Changing password"});
        } catch (error) {
            console.error('Error in changing password:', error);
            return res.send({"status":"Failed" ,"message" : "Error in changing password"});
        }
    }else{
        return res.send({"status":"Failed" ,"message" : "All fields are required"});
    }
}

module.exports = { userRegistration , userLogin , changePassword};
