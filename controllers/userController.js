const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { addUserQuery, userExists , updatePassword} = require("../models/userModel.js");
const {executeQuery} = require('../db_config/db_schema.js');
const {transporter} = require('../db_config/emailConfig.js');
const userRegistration = async (req, res) => {
    var { user_name, email, password, is_admin } = req.body;

    if (!(user_name , email && password)) {
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
        res.send(`User created successfully with email - ${email} and has ${token}`);
    } catch (error) {
        res.send("Unable to register");
        console.error(error); // Use console.error for logging errors
    }
};

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
            expiresIn: "15m",
        })
        res.cookie('access_token', token);
        return res.send({"token":token,"success":true,"user_id":user_id,"is_admin": result[0].is_admin});
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

const changePassword = async (req , res) => {
    const {currentPassword , newPassword} = req.body;
    if(!(currentPassword && newPassword)){
        return res.send({"status" : "Error" , "message" : "All fields are required"});
    }
    try {
        const email = req.user[0].email
        const query = 'SELECT password FROM users WHERE email = ?';
        const results = await executeQuery(query, [email]);
        if (results.length === 0) {
        return res.send({ status: 'Error', message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(currentPassword, results[0].password);
        
        if (!isMatch) {
            return res.send({ status: 'Error', message: 'Current password is incorrect' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);
        const isWorking = await updatePassword(hashPassword,email);
        console.log({ status: 'Success', message: 'Password updated successfully' });
        return res.send({ status: 'Success', message: 'Password updated successfully' , "info" : info});
    } catch (error) {
        console.error('Error in changing password:', error);
        return res.send({ status: 'Error', message: 'Error in changing password' });
    }
};

const loggedUser  = async (req, res) => {
    try {
    const user = req.user.email
    return res.send({ "user": user })    
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

const sendPasswordResetEmail = async (req, res) => {
    const { email } = req.body;
    const results = await userExists(email);

    try {
        if (results.length === 0) {
            return res.send({ "status": "Error", "Message": "User with this email doesn't exist." });
        }
        console.log("");
        const SECRET = results.email + process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ email: email }, SECRET, { expiresIn: "5d" });

        // const link = `http://localhost:9090/user/reset/${email}/${token}`;
        // email stuff
        const info = transporter.sendMail({
            from: '"Omkar Hirave 👻" <omkarhirve05@gmail.com>',
            to: results[0].email,
            subject: "Wake me up when september ends....",
            html: `<a href="${link}">Click Here</a> to Reset Your Password`,
          });
        return res.send({ "status": "Success", "Message": "Password reset mail sent....Please check your mail" });

    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

const userPasswordReset = async(req , res) =>{
    const {password , password_confirmation} = req.body;
    const {email , token } = req.params;
    const results = await userExists(email);
    const NEW_SECRET = results.email + process.env.JWT_SECRET_KEY;
    console.log(NEW_SECRET);
    try {
        jwt.verify(token , NEW_SECRET);
        if(!(password && password_confirmation)){
            return res.send({"status" : "Error" , "Message" : "All fields are required..."});
        }if(password !== password_confirmation){
            return res.send({"status" : "Error" , "Message" : "Password and confirm password should be same..."});
        }
        const salt = await bcrypt.genSalt(10);
        const newHashPassword  = await bcrypt.hash(password , salt);
        const isWorking = await updatePassword(newHashPassword,email);
        return res.send({ status: 'Success', message: 'Password updated successfully' });
    } catch (error) {
        console.log(error);
    } 
    } 

module.exports = { userRegistration , userLogin , changePassword , loggedUser , sendPasswordResetEmail , userPasswordReset};
