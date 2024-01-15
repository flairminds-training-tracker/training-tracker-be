const express = require("express");
const morganMiddleware = require('../middlewares/morgan.middleware');
const { routesMap } = require('../routes');


function createServer() {
    const app = express();
    const cors = require('cors');

    app.use(cors({origin: true, credentials: true}));
    app.use(express.json());
    app.use(morganMiddleware);

    Object.keys(routesMap).forEach((key) => app.use(key, routesMap[key]))

    return app;
}

module.exports = { createServer }