const dotenv = require("dotenv");
dotenv.config();

const { createServer } = require('./utils/server');

const port = process.env.PORT || 9090;

const app = createServer();

app.listen(port, () => {
  console.info(`Server running on port ${port}`);
});
