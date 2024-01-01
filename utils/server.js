const express = require("express");

const { routesMap } = require('../routes');

function createServer() {
    const app = express();
    const cors  = require('cors');

    app.use(cors({origin: true, credentials: true}));
    app.use(express.json());

    Object.keys(routesMap).forEach((key) => app.use(key, routesMap[key]))

    return app;
}

module.exports = { createServer }
    