const express = require("express");
const dotenv = require("dotenv");
const cors  = require('cors');
dotenv.config();
const app = express();

const { userRouter } = require("./routes/userRouter.js");
const { technologyRouter } = require("./routes/technologyRouter.js");
const { activitiesRouter } = require("./routes/activitiesRouter.js");
const {traineeRouter}  = require('./routes/traineeRouter.js');
const port = process.env.PORT || 9000;

app.use(express.json());
// const corsOptions = {
//   origin: 'http://localhost:9090',
// };
app.use(cors());
// app.use(cors('*'));

app.use("/user", userRouter);
app.use("/tech", technologyRouter);
app.use("/acti", activitiesRouter);
app.use("/trainee", traineeRouter);

app.listen(port, ()=> {
  console.log(`Server running on port ${port}`);
});
