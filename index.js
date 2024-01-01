const cors = require('cors');
const dotenv = require("dotenv");
const express = require("express");
dotenv.config();
const app = express();

const { activitiesRouter } = require("./routes/activitiesRouter");
const { technologyRouter } = require("./routes/technologyRouter");
const {traineeRouter} = require('./routes/traineeRouter');
const {trainingPlanRouter} = require('./routes/trainingPlanRouter');
const { userRouter } = require("./routes/userRouter");

const port = process.env.PORT || 9090;

app.use(cors({origin: true, credentials: true}));
app.use(express.json());

// comment
app.use("/user", userRouter);
app.use("/tech", technologyRouter);
app.use("/acti", activitiesRouter);
app.use("/trainee", traineeRouter);
app.use("/trainingPlan", trainingPlanRouter)

app.listen(port, () => {
  console.info(`Server running on port ${port}`);
});
