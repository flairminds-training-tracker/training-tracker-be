const CONFIG = require('./utils/config');
const { createServer } = require('./utils/server');

const app = createServer();

app.listen(CONFIG.SERVER_PORT, () => {
  console.info(`Server running on port ${CONFIG.SERVER_PORT}`);
});
