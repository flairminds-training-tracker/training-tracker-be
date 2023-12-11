const express = require("express");
const dotenv = require("dotenv");
const cors  = require('cors');
dotenv.config();
const app = express();

const { userRouter } = require("./routes/userRouter.js");
const { technologyRouter } = require("./routes/technologyRouter.js");
const { activitiesRouter } = require("./routes/activitiesRouter.js");
const {traineeRouter}  = require('./routes/traineeRouter.js');
const {trainingPlanRouter} =  require('./routes/trainingPlanRouter.js')
const port = process.env.PORT || 9090;

app.use(cors({origin: true,credentials: true}));
app.use(express.json());

// defining routes
app.use("/user", userRouter);
app.use("/tech", technologyRouter);
app.use("/acti", activitiesRouter);
app.use("/trainee", traineeRouter);
app.use("/trainingPlan", trainingPlanRouter)

app.listen(port, ()=> {
  console.log(`Server running on port ${port}`);
});
