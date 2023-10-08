const { logEvent } = require('./logger');

const errorHandler = (err, req, res, next) => {
  logEvent(`${err.name}\t${err.message}`, 'errLog.txt');
  console.error(err);
  res.status(500).json({ status: 'error', message: 'Internal Server Error' });
};

module.exports = errorHandler;
