const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvent = async (message, logName) => {
  const dateTime = `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
    }
    await fsPromises.appendFile(
      path.join(__dirname, '..', 'logs', logName),
      logItem
    );
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const logger = (req, res, next) => {
  logEvent(`${req.method}\t${req.path}\t${req.url}`, 'reqLog.txt');
  console.log(`${req.method}\t${req.path}\t${req.url}`);
  next();
};

module.exports = {
  logEvent,
  logger,
};
