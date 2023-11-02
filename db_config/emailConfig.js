require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
      user: "alan60@ethereal.email",
      pass: "EAEqE6P3tFbgR9vj7F",
  },
});

module.exports = {transporter};
