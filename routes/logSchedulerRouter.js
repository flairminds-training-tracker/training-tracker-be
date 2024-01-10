const logSchedulerRouter = require("express").Router();
const {addLogFiles, getLogFiles} = require('../utils/log_scheduler');

logSchedulerRouter.get("/", async(req, res) => {
    const msg = await addLogFiles();
    res.send(msg);
});

logSchedulerRouter.get('/getObjectList', async(req, res) => {
    const msg = await getLogFiles();
    console.info(msg);
    res.send(msg);
});

module.exports = {logSchedulerRouter};