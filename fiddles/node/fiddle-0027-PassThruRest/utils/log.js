const
  log = require('npmlog'),
  logfile = require('npmlog-file'),
  moment = require('moment'),
  stateConfig = require('../config/state'),
  isDev = stateConfig.isDev,
  isLogFile = stateConfig.isLogFile,
  logFileName = stateConfig.logFile,
  env = process.env,
  format = 'HH:mm:ss',
  updateLogFile = function() {
    if (isLogFile) {
      logfile.write(log, logFileName);
    }
  };

exports.info = function(msg) {
  let date = new Date(),
    timestamp = moment(date).format(format);
  if (isDev) {
    log.info(timestamp, msg);
    updateLogFile();
  }
};

exports.error = function(err) {
  let date = new Date(),
    timestamp = moment(date).format(format);
  if('message' in err) {
    log.error(timestamp, err.message);
  } else {
    log.error(timestamp, err);
  }
};

exports.console = function(msg) {
  if (isDev) {
    console.log(msg);
    updateLogFile();
  }
}




