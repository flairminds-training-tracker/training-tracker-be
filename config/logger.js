const fs = require('fs');
const path = require('path');
const { createLogger, transports, format } = require('winston');

const dirPath = path.join('__dirname');

if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const errorLogger = createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp({
      format: () => {
        const now = new Date();
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();
        return `date is ${date}, Time is ${time} `;
      }
    }),
    format.errors({ stack: true }),
    format.printf(info => `${info.timestamp} -- ${info.level}: ${info.message}\nAdditional Information:\n${JSON.stringify(info, null, 2)}\n\n`)
  ),
  transports: [
    new transports.File({ filename: `${dirPath}/errorLogger.log`, level: 'error' })
  ]
});

const infoLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: () => {}
    }),
    format.printf(info => `${info.timestamp} ${info.ipaddress}: ${JSON.stringify(info.message)}\n`)
  ),
  transports: [
    new transports.File({ filename: `${dirPath}/infoLogger.log`, level: 'info' })
  ]
});


module.exports = { errorLogger, infoLogger };