const dotenv = require("dotenv");
dotenv.config();

const CONFIG = {
    SERVER_PORT: process.env.PORT || 9090,
    DB_HOST: process.env.HOST,
    DB_USER: process.env.USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DATABASE,
    DB_PORT: process.env.DATABASE_PORT,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
}

module.exports = CONFIG