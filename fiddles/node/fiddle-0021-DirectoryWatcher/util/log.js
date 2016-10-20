const
  log = require('npmlog'),
  moment = require('moment'),
  isDev = require('../config/state').isDev,
  env = process.env,
  format = 'HH:mm:ss';

exports.info = function(msg) {
  let date = new Date(),
    timestamp = moment(date).format(format);
  if (isDev) {
    setTimeout(() => {
      log.info(timestamp, msg);
    }, 200);
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
  }
}




